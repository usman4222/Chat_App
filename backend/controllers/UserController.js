import User from "../models/AuthModel.js";
import { renameSync, unlinkSync } from "fs"

export const getUserData = async (req, res) => {

    try {
        const userData = await User.findById(req.userId)

        if (!userData) {
            return res.status(404).send("User not found with this ID")
        }

        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            message: { json: "User gets successfully" }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internel server error")

    }
}


export const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req
        const { firstName, lastName, color } = req.body

        if (!firstName || !lastName) {
            return res.status(400).send("First Name and Last Name is required. ")
        }

        const userData = await User.findByIdAndUpdate(userId, {
            firstName, lastName, color, profileSetup: true
        }, { new: true, runValidators: true })

        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            message: { json: "User updates successfully" }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internel server error")
    }
}


export const addProfileImage = async (req, res) => {

    if (!req.file) {
        return res.status(400).send("Image is required");
    }

    const date = Date.now();
    const fileName = `uploads/profiles/${date}${req.file.originalname}`;

    renameSync(req.file.path, fileName);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { image: fileName },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        return res.status(200).json({
            image: updatedUser.image
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
};


export const delProfileImage = async (req, res) => {
    try {
        const { userId } = req
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).send("User not exist.")
        }

        if (user.image) {
            unlinkSync(user.image)
        }
        user.image = null
        await user.save()

        return res.status(200).json("Profile Image deleted successfully.")
        

    } catch (error) {
    console.log(error);
    return res.status(500).send("Internel server error")
}
}