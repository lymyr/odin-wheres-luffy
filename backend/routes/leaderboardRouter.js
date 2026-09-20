import { Router } from "express";
import isValidJwt from "../middleware/isValidJwt.js";
import personsIsEmpty from "../middleware/personsIsEmpty.js";
import { addLeaderboard, getLeaderboard } from "../controllers/leaderboardController.js";
import { throwerHelper, usernameValidation } from "../middleware/validation.js";

const leaderboardRouter = Router({mergeParams: true})

leaderboardRouter.get("/", getLeaderboard)

leaderboardRouter.post("/",
    usernameValidation.username,
    throwerHelper,
    isValidJwt,
    personsIsEmpty,
    addLeaderboard
)

export default leaderboardRouter