import jwt from "jsonwebtoken"

export default function (req, res, next) {
    const decodedToken = jwt.verify(req.body.token, process.env.JWT_SECRET)
    req.decodedToken = decodedToken
    next()
}