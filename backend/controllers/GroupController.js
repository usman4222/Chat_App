import mongoose from "mongoose";
import User from "../models/AuthModel.js";
import Group from "../models/GroupModel.js";

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const userId = req.userId;

    const admin = await User.findById(userId);

    if (!admin) {
      return res.status(400).json("Admin User not Found.");
    }

    const validMember = await User.find({ _id: { $in: members } });

    if (validMember.length !== members.length) {
      return res.status(400).json("Some members are not valid users");
    }

    const newGroup = new Group({
      name,
      members,
      admin: userId,
    });

    await newGroup.save();

    return res.status(201).json({ group: newGroup });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internel server error");
  }
};



export const getAllGroups = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const groups = await Group.find({
      $or: [
        { amdin: userId },
        { members: userId }
      ]
    }).sort({ updatedAt: -1 });

    return res.status(201).json({ groups });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};



export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params

    const groups = await Group.findById(groupId).populate({
      path: "messages", populate: {
        path: "sender", select: "firstName lastName email _id color image"
      }
    })

    if (!groups) {
      return res.status(404).json("Group not found");
    }

    const messages = groups.messages

    return res.status(201).json({ messages });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
