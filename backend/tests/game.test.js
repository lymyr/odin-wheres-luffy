import app from "../app"
import request from "supertest"
import jwt from "jsonwebtoken"
import { prisma } from "../lib/prisma.js"
import checkAnswer from "../middleware/checkAnswer.js"


beforeEach(() => {
    jest.spyOn(prisma.person, "findFirst").mockResolvedValue({
        name: "lol",
        xMinPos: 0.67,
        xMaxPos: 0.671,
        yMinPos: 0.204,
        yMaxPos: 0.21
    })
})

afterAll(async () => {
    await prisma.leaderboard.deleteMany()
    await prisma.$disconnect()
})

afterEach(() => {
    jest.restoreAllMocks()
})

describe("Post /:gameId", () => {
    test("accepts submission data and returns jwt response", async () => {
        const submissionData = {
            gameId: 1,
            persons: ["gojo", "optimum pride", "lol", "abc"],
            sessionId: "any",
            startDate: new Date()
        }
        jest.spyOn(jwt, "verify").mockReturnValue(submissionData)
        jest.spyOn(jwt, "sign").mockReturnValue("signedToken")

        const res = await request(app)
            .post("/v1/1")
            .send({
                person: "lol",
                coords: {x: 0.67, y: 0.21},
                token: "token"
            })
        expect(res.body.data.token).toEqual("signedToken") 
    })
   
    test("returns the same token for incorrect coords", async () => {
        const submissionData = {
            gameId: 1,
            persons: ["gojo", "optimum pride", "lol", "abc"],
            sessionId: "any",
            startDate: new Date()
        }
        jest.spyOn(jwt, "verify").mockReturnValue(submissionData)
        jest.spyOn(jwt, "sign").mockReturnValue("signedToken")

        const res = await request(app)
            .post("/v1/1")
            .send({
                person: "lol",
                coords: {x: 0.69, y: 0.21},
                token: "token"
            })
        expect(res.body.data.token).toEqual("token") 
    })
})

describe("answer verification middleware", () => {
    test("pops person within coords", async () => {
        const req = {
            decodedToken: {
                gameId: 1,
                persons: ["gojo", "optimum pride", "lol", "abc"]  
            },
            body: {
                person: "lol",
                token: "jwtToken",
                coords: {x: 0.67, y: 0.21}
            }
        }

        const res = {
            status: () => {
                return res
            },
            json: () => {}
        }
        await checkAnswer(req, res, jest.fn())
        expect(req.decodedToken.persons).toEqual(["gojo", "optimum pride", "abc"])
    })

    test("persons arr doesnt change due lower xPos", async () => {
        const req = {
            decodedToken: {
                gameId: 1,
                persons: ["gojo", "optimum pride", "lol", "abc"]  
            },
            body: {
                person: "lol",
                token: "jwtToken",
                coords: {x: 0.66, y: 0.21}
            }
        }

        const res = {
            status: () => {
                return res
            },
            json: () => {}
        }
        await checkAnswer(req, res, jest.fn())

        expect(req.decodedToken.persons).toEqual(["gojo", "optimum pride", "lol", "abc"])
    })

    test("persons arr doesnt change due higher xPos", async () => {
        const req = {
            decodedToken: {
                gameId: 1,
                persons: ["gojo", "optimum pride", "lol", "abc"]  
            },
            body: {
                person: "lol",
                token: "jwtToken",
                coords: {x: 0.66, y: 0.21}
            }
        }

        const res = {
            status: () => {
                return res
            },
            json: () => {}
        }
        await checkAnswer(req, res, jest.fn())

        expect(req.decodedToken.persons).toEqual(["gojo", "optimum pride", "lol", "abc"])

    })
    test("persons arr doesnt change due lower yPos", async () => {
        const req = {
            decodedToken: {
                gameId: 1,
                persons: ["gojo", "optimum pride", "lol", "abc"]  
            },
            body: {
                person: "lol",
                token: "jwtToken",
                coords: {x: 0.66, y: 0.21}
            }
        }

        const res = {
            status: () => {
                return res
            },
            json: () => {}
        }
        await checkAnswer(req, res, jest.fn())

        expect(req.decodedToken.persons).toEqual(["gojo", "optimum pride", "lol", "abc"])
    })

    test("persons arr doesnt change due higher yPos", async () => {
        const req = {
            decodedToken: {
                gameId: 1,
                persons: ["gojo", "optimum pride", "lol", "abc"]  
            },
            body: {
                person: "lol",
                token: "jwtToken",
                coords: {x: 0.66, y: 0.21}
            }
        }

        const res = {
            status: () => {
                return res
            },
            json: () => {}
        }
        await checkAnswer(req, res, jest.fn())

        expect(req.decodedToken.persons).toEqual(["gojo", "optimum pride", "lol", "abc"])
    })
})

describe("leaderboard", () => {
    
})