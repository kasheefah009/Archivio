import jwt from "jsonwebtoken"

export const checkToken = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Token not found, signup or login."
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken) {
            return res.status(401).json({
                message: "Unauthorized."
            })
        }
        req.userId = decodedToken.id
        next()
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}