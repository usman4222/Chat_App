import mongoose from "mongoose";
import User from "../models/AuthModel.js";
import Group from "../models/GroupModel.js";
import { Types } from "mongoose";

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

export const addNewMemberToGroupByAdmin = async (req, res) => {
  try {
    const { groupId, newMemberId } = req.body;
    const userId = req.userId;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    if (group.admin.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Only the group admin can add members." });
    }

    const newMember = await User.findById(newMemberId);
    if (!newMember) {
      return res.status(400).json({ message: "New member not found." });
    }

    if (group.members.includes(newMemberId)) {
      return res
        .status(400)
        .json({ message: "User is already a member of the group." });
    }

    group.members.push(newMemberId);
    await group.save();

    return res
      .status(200)
      .json({ message: "New member added successfully.", group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const removeMemberFromGroupByAdmin = async (req, res) => {
  try {
    const { groupId, memberIds } = req.body;
    const userId = req.userId;

    if (!Array.isArray(memberIds)) {
      return res.status(400).json({ message: "memberIds must be an array." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    if (group.admin.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Only the group admin can remove members." });
    }

    const invalidMembers = memberIds.filter(
      (memberId) => !group.members.includes(memberId)
    );
    if (invalidMembers.length) {
      return res.status(400).json({
        message: "Some users are not members of the group.",
        invalidMembers,
      });
    }

    await Group.updateOne(
      { _id: groupId },
      { $pull: { members: { $in: memberIds } } }
    );

    const updatedGroup = await Group.findById(groupId);

    return res
      .status(200)
      .json({ message: "Members removed successfully.", group: updatedGroup });
  } catch (error) {
    console.error("Error removing members from group:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const memberRemoveItselfFromGroup = async (req, res) => {
  try {
    const { groupId, memberId } = req.body;

    if (!groupId || !memberId) {
      return res
        .status(400)
        .json({ message: "Group ID and Member ID are required." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    if (!group.members.includes(memberId)) {
      return res
        .status(400)
        .json({ message: "User is not a member of the group." });
    }

    await Group.updateOne({ _id: groupId }, { $pull: { members: memberId } });

    const updatedGroup = await Group.findById(groupId);

    return res.status(200).json({
      message: "You have been removed from the group successfully.",
      group: updatedGroup,
    });
  } catch (error) {
    console.error("Error removing member from group:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const delGroupByAdmin = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.userId;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    if (group.admin.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Only the group admin can delete the group." });
    }

    await Group.deleteOne({ _id: groupId });

    return res.status(200).json({ message: "Group deleted successfully." });
  } catch (error) {
    console.error("Error deleting group:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};



export const addNewAdminByAdmin = async (req, res) => {
  try {
    const { groupId, newAdminId } = req.body;
    const currentAdminId = req.userId;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    if (group.admin.toString() !== currentAdminId) {
      return res.status(403).json({
        message: "Only the current admin can assign a new admin."
      });
    }

    if (!group.members.includes(newAdminId)) {
      return res.status(400).json({
        message: "The new admin must be a member of the group."
      });
    }

    group.admin = newAdminId;
    await group.save();

    return res.status(200).json({
      message: "New admin assigned successfully.",
      group
    });

  } catch (error) {
    console.error("Error assigning new admin:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// export const addNewAdminByAdmin = async (req, res) => {
//   try {
//     const { groupId, newAdminId } = req.body;
//     const currentAdminId = req.userId;

//     const group = await Group.findById(groupId);

//     if (!group) {
//       return res.status(404).json({ message: "Group not found." });
//     }

//     if (group.admin.toString() !== currentAdminId) {
//       return res.status(403).json({
//         message: "Only the current admin can assign a new admin."
//       });
//     }

//     if (!group.members.includes(newAdminId)) {
//       return res.status(400).json({
//         message: "The new admin must be a member of the group."
//       });
//     }

//     if (!group.secondaryAdmins) {
//       group.secondaryAdmins = []; 
//     }

//     if (group.secondaryAdmins.includes(newAdminId)) {
//       return res.status(400).json({
//         message: "This user is already a secondary admin."
//       });
//     }

//     group.secondaryAdmins.push(newAdminId);
//     await group.save();

//     return res.status(200).json({
//       message: "New admin added successfully.",
//       group
//     });

//   } catch (error) {
//     console.error("Error assigning new admin:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

export const getAllGroupMembers = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const memberIds = group.members;
    const adminId = group.admin;

    const memberObjectIds = memberIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    const adminObjectId = new mongoose.Types.ObjectId(adminId);

    const users = await User.find({
      _id: { $in: [...memberObjectIds, adminObjectId] },
    });

    const adminData = users.find((user) => user._id.equals(adminObjectId));
    const membersData = users.filter((user) => !user._id.equals(adminObjectId));

    return res.status(200).json({ admin: adminData, members: membersData });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const groups = await Group.find({
      $or: [{ amdin: userId }, { members: userId }],
    }).sort({ updatedAt: -1 });

    return res.status(201).json({ groups });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    const groups = await Group.findById(groupId).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "firstName lastName email _id color image",
      },
    });

    if (!groups) {
      return res.status(404).json("Group not found");
    }

    const messages = groups.messages;

    return res.status(201).json({ messages });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
