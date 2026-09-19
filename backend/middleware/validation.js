import { param, validationResult } from "express-validator"
import { prisma } from "../lib/prisma.js"

export function throwerHelper (req, res, next) {
    const errors = validationResult(req)
    if (errors.isEmpty())
        return next()
    res.json({
        error: errors.mapped()
    })
}

class Validation {
    constructor() {
        throw new Error("Class shouldn't be instantiated")
    }
}

export class GameValidation extends Validation {
    static id = param("gameId").exists().withMessage("Please add a gameId parameter")
        .isInt().withMessage("gameId should be an integer").toInt().bail()
        .custom(async (id, {req}) => {
            const game = await prisma.game.findFirst({where: {id}, include: { persons: true }})
            if (!game)
                throw new Error("Game not found")
            req.game = game
        })
}