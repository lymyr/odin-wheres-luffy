import { Router } from "express";
import { getStartGame } from "../controllers/indexController.js";
import { GameValidation, throwerHelper } from "../middleware/validation.js";

const indexRouter = Router()

indexRouter.get('/:gameId', 
    GameValidation.id,
    throwerHelper,
    getStartGame
)

export default indexRouter