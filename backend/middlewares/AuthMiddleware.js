import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send("You are not authorized!")
    }
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        req.userId = payload.userId
        next()
    })

}