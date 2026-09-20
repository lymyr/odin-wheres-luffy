import jwt from "jsonwebtoken"

process.loadEnvFile()

export const sendCoords = (req, res) => {
    const payload = req.decodedToken.persons.length == 0 ? 
        { ...req.decodedToken, endTime: new Date() } : 
        req.decodedToken
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({data: {token}})
}