import { prisma } from "../lib/prisma.js"

export const addLeaderboard = async (req, res) => {
    const user = await prisma.leaderboard.create({data: {
        name: req.body.username,
        startTime: req.decodedToken.startTime,
        endTime: req.decodedToken.endTime,
        gameId: req.decodedToken.gameId
    }})
    
    res.json({
        data: {
            user
        }
    })
}

export const getLeaderboard = async (req, res) => {
    const leaderboard = await prisma.$queryRaw`
        SELECT * FROM "Leaderboard" ORDER BY
            "Leaderboard"."endTime" - "Leaderboard"."startTime"
    `
    res.json({
        data: {
            leaderboard
        }
    })
}