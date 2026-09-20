import jwt from "jsonwebtoken"
import request from "supertest"
import app from "../../app.js"
import { prisma } from "../../lib/prisma.js"

afterEach(async () => {
    jest.clearAllMocks()
    await prisma.leaderboard.deleteMany()
    await prisma.$disconnect()
})

const createLeaderboard = jest.spyOn(prisma.leaderboard, "create")

describe("POST /:gameId/leaderboard", () => {
    test("sends token back if persons not empty", async () => {
        const jwtVerifyMock = jest.spyOn(jwt, "verify").mockReturnValue({
            gameId: 1,
            persons: ["gojo", "optimum pride", "lol", "abc"]
        })

        const res = await request(app)
            .post("/v1/1/leaderboard")
            .send({
                username: "testUser",
                token: "token"
            })

        expect(createLeaderboard.mock.calls).toHaveLength(0)
        expect(res.body.data.token).toBe("token")
        
        jwtVerifyMock.mockRestore()
    })

    test("sends leaderboard row of user if persons is empty", async () => {
        const jwtVerifyMock = jest.spyOn(jwt, "verify").mockReturnValue({
            gameId: 1,
            persons: [],
            startDate: new Date(2000, 1)
        })
        const res = await request(app)
            .post("/v1/1/leaderboard")
            .send({
                    username: "testUser",
                    token: "token"
            })
        expect(createLeaderboard.mock.calls).toHaveLength(1)
        expect(res.body.data).toEqual({
            user: expect.anything(),
        })
        jwtVerifyMock.mockRestore()
    })

    test("reject if username is empty", async () => {
        const jwtVerifyMock = jest.spyOn(jwt, "verify").mockReturnValue({
            gameId: 1,
            persons: []
        })
        const res = await request(app)
            .post("/v1/1/leaderboard")
            .send({
                username: "",
                token: "token"
            })
        expect(createLeaderboard.mock.calls).toHaveLength(0)
        expect(res.body.data.token).toBe("token")
        jwtVerifyMock.mockRestore()
    })

    test("reject if username is long", async () => {
        const jwtVerifyMock = jest.spyOn(jwt, "verify").mockReturnValue({
            gameId: 1,
            persons: []
        })
        const res = await request(app)
            .post("/v1/1/leaderboard")
            .send({
                username: "sadfb kasjdbf kjasdhbfkjsadh bfaskjdhfbasdj fsjadbh",
                token: "token"
            })
        expect(createLeaderboard.mock.calls).toHaveLength(0)
        expect(res.body.data.token).toBe("token")
        jwtVerifyMock.mockRestore()
    })
})

test("GET /:gameId/leaderboard", async () => {
    const res = await request(app)
        .get("/v1/1/leaderboard")
    expect(res.body.data.leaderboard).toBeDefined()
})