import mongoose from "mongoose";
import User from "../models/AuthModel.js";
import Message from "../models/MessagesModel.js";

export const SearchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (searchTerm === undefined || searchTerm === null) {
      return res.status(400).json("Please enter data to search.");
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
      _id: { $ne: req.userId },
    });

    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found." });
    }

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).send("Internal server error");
  }
};


export const getContactsForDMList = async (req, res) => {
  try {
    let { userId } = req;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          color: "$contactInfo.color",
          image: "$contactInfo.image",
        },
      },
      {
        $sort: { lastMessageTime: -1 }
      },
    ]);

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).send("Internal server error");
  }
};




export const getAllContacts = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: res.userId } }, "firstName lastTime email _id")

    const contacts = users.map((user) => ({
      label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email
    }))

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).send("Internal server error");
  }
};
