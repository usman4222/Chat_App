import User from "../models/AuthModel.js";

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