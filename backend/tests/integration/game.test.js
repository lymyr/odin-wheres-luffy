import app from "../../app.js"
import request from "supertest"
import jwt from "jsonwebtoken"
import { prisma } from "../../lib/prisma.js"


afterAll(async () => {
    await prisma.$disconnect()
})

afterEach(() => {
    jest.restoreAllMocks()
})

describe("POST /:gameId", () => {
    test("accepts submission data and returns jwt response", async () => {
        const submissionData = {
            gameId: 1,
            persons: ["Luffy", "Zoro", "Sanji", "Waldo"],
            sessionId: "any",
            startTime: new Date()
        }
        jest.spyOn(jwt, "verify").mockReturnValue(submissionData)
        jest.spyOn(jwt, "sign").mockReturnValue("signedToken")

        const res = await request(app)
            .post("/v1/1")
            .send({
                person: "Luffy",
                coords: {x: 0.51, y: 0.13},
                token: "token"
            })
        expect(res.body.data.token).toEqual("signedToken") 
    })
   
    test("returns the same token for incorrect coords", async () => {
        const submissionData = {
            gameId: 1,
            persons: ["Luffy", "Zoro", "Sanji", "Waldo"],
            sessionId: "any",
            startTime: new Date()
        }
        jest.spyOn(jwt, "verify").mockReturnValue(submissionData)
        jest.spyOn(jwt, "sign").mockReturnValue("signedToken")

        const res = await request(app)
            .post("/v1/1")
            .send({
                person: "Luffy",
                coords: {x: 0.69, y: 0.21},
                token: "token"
            })
        expect(res.body.data.token).toEqual("token") 
    })
})

