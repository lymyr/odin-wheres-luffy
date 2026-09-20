import { Router } from "express";
import { getStartGame } from "../controllers/indexController.js";
import { GameValidation, throwerHelper } from "../middleware/validation.js";
import { sendCoords } from "../controllers/gameController.js";
import isValidJwt from "../middleware/isValidJwt.js";
import checkAnswer from "../middleware/checkAnswer.js";

const indexRouter = Router()

indexRouter.get('/:gameId', 
    GameValidation.id,
    throwerHelper,
    getStartGame
)

indexRouter.post('/:gameId', 
    isValidJwt,
    checkAnswer,
    sendCoords
)

export default indexRouter