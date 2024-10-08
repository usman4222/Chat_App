import pkg from 'jsonwebtoken';
const { sign } = pkg;

const maxAge = 3 * 24 * 60 * 60 * 100

export const createToken = (email, userId) => {
    return sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge })
}