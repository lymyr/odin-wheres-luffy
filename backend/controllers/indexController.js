import jwt from "jsonwebtoken"

process.loadEnvFile()

export const getStartGame = (req, res) => {
    const startDate = new Date()
    const token = jwt.sign({
        startDate,
        gameId: req.game.id,
        persons: req.game.persons,
        sessionId: req.sessionID
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.json({
        data: {
            token
        }
    })
}