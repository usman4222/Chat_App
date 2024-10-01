import User from "../models/AuthModel";
import Group from "../models/GroupModel";

export const logout = async (req, res) => {
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
