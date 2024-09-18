import User from "../models/AuthModel.js";
import { createToken } from "../utils/Token.js";
import pkg from 'bcryptjs';
const { compare } = pkg;

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Please enter all fields")
        }
        const user = await User.create({ email, password })
        const maxAge = 3 * 24 * 60 * 60 * 1000;
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        })
        res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internel server error")
    }
}



export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Please enter all fields")
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).send("Email or Password not Valid")
        }

        const auth = await compare(password, user.password)

        if (!auth) {
            return res.status(400).send("Email or Password not Valid")
        }
        const maxAge = 3 * 24 * 60 * 60 * 1000;
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        })
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
                message: { json: "User login successfully" }
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internel server error")
    }
}