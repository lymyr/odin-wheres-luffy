import { Router } from "express";
import isValidJwt from "../middleware/isValidJwt.js";
import personsIsEmpty from "../middleware/personsIsEmpty.js";

const leaderboardRouter = Router({mergeParams: true})

leaderboardRouter.get("/",
    (req, res) => {res.json({placeholder : 1})}
)

leaderboardRouter.post("/",
    isValidJwt,
    personsIsEmpty
)

export default leaderboardRouter