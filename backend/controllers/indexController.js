import jwt from "jsonwebtoken"

process.loadEnvFile()

export const getStartGame = (req, res) => {
    const startTime = new Date()
    const token = jwt.sign({
        startTime,
        gameId: req.game.id,
        persons: req.game.persons
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.json({
        data: {
            token
        }
    })
}