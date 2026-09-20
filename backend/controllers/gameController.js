import jwt from "jsonwebtoken"

process.loadEnvFile()

export const sendCoords = (req, res) => {
    const token = jwt.sign(req.decodedToken, process.env.JWT_SECRET)
    res.json({data: {token}})
}