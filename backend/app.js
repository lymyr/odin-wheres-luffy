import express from "express"
import session from "express-session"
import indexRouter from "./routes/indexRouter.js"
import cors from "cors"

process.loadEnvFile()

const app = express()
app.use(session({
    cookie: {
        maxAge: 1000*60*60*24,
    },
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true
}))

const corsOptions = process.env.ORIGINS ? 
    { origin: process.env.ORIGINS.split(",") } : { origin: "*" }

app.use(express.json())
app.use(cors(corsOptions))

app.use("/v1", indexRouter)

if (process.env.NODE_ENV != "test")
    app.listen(process.env.PORT, () => {
        console.log("Listening to", process.env.PORT)
    })

export default app