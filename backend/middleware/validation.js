import { body, param, validationResult } from "express-validator"
import { prisma } from "../lib/prisma.js"

export function throwerHelper (req, res, next) {
    let errorCode = 400;
    if (req.statusCode)
        errorCode = req.statusCode

    const errors = validationResult(req)
    if (errors.isEmpty())
        return next()

    let payload = {
        error: errors.mapped()
    }
    if (req.body?.token)
        payload = {
            ...payload,
            data: {
                token: req.body.token
            }
        }
    res.status(errorCode).json(payload)
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

export class usernameValidation extends Validation {
    static username = body("username").trim().notEmpty().withMessage("Please add a username")
        .isLength({max: 14}).withMessage("Username should not exceed 14 characters")
}