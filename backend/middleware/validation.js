import { param, validationResult } from "express-validator"
import { prisma } from "../lib/prisma.js"

export function throwerHelper (req, res, next) {
    let errorCode = 400;
    if (req.statusCode)
        errorCode = req.statusCode

    const errors = validationResult(req)
    if (errors.isEmpty())
        return next()

    res.status(errorCode).json({
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
            const game = await prisma.game.findFirst({where: {id}, include: { persons: {select: {id: true, name: true}} }})
            if (!game) {
                req.statusCode = 404
                throw new Error("Game not found")
            }
                
            req.game = game
        })
}