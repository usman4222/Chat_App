import User from "../models/AuthModel.js";

export const SearchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (searchTerm === undefined || searchTerm === null) {
      return res.status(400).json("Please enter data to search.");
    }

    const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
