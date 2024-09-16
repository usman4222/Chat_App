import User from "../models/AuthModel";
import { createToken } from "../utils/Token";

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).send("Please enter all fields")
        }
        const user = await User.create({ email, password })

        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        })
        res.status(201).json({user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
        }})
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internel server error")
    }
}