import { Router } from "express";
import isValidJwt from "../middleware/isValidJwt";

const leaderboardRouter = Router({mergeParams: true})

leaderboardRouter.get("/",
    isValidJwt
)

leaderboardRouter.post("/",
    isValidJwt
)

export default leaderboardRouter