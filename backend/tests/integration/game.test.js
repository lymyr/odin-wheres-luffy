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

    test("returns endDate if user got the last person correctly", async () => {
        jest.useFakeTimers({
            doNotFake: [
                'hrtime',
                'nextTick',
                'performance',
                'queueMicrotask',
                'requestAnimationFrame',
                'cancelAnimationFrame',
                'requestIdleCallback',
                'cancelIdleCallback',
                'setImmediate',
                'clearImmediate',
                'setInterval',
                'clearInterval',
                'setTimeout',
                'clearTimeout',
                'Temporal'
            ]
        })
        const submissionData = {
            gameId: 1,
            persons: [{name: "Luffy"}],
            sessionId: "any",
            startTime: new Date(),
            exp: "exp",
            iat: "iat"
        }
        jest.spyOn(jwt, "verify").mockReturnValue(submissionData)

        const mockedJwt = jest.spyOn(jwt, "sign")
        mockedJwt.mockReturnValue(123)

        const res = await request(app)
            .post("/v1/1")
            .send({
                person: "Luffy",
                coords: {x: 0.51, y: 0.13},
                token: "token"
            })

        expect(mockedJwt).toHaveBeenCalledWith({
            startTime: expect.any(Date),
            endTime: new Date(),
            gameId: expect.anything(),
            persons: expect.any(Array),
            sessionId: expect.anything(),
            iat: expect.anything(),
            exp: expect.anything(),
        }, expect.anything())

        expect(res.body).toEqual({
            data: {
                token: 123,
            }
        })
    })
})

