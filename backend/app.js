import express from "express"

process.loadEnvFile()

const app = express()

app.listen(process.env.PORT, () => {
    console.log("Listening to", process.env.PORT)
})