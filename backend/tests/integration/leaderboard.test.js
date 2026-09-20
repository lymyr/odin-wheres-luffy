import jwt from "jsonwebtoken"
import request from "supertest"
import app from "../../app.js"
import { prisma } from "../../lib/prisma.js"

afterEach(async () => {
    jest.clearAllMocks()
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
        console.log(res.body)
        expect(createLeaderboard.mock.calls).toHaveLength(0)
        expect(res.body.data.token).toBe("token")
        
        jwtVerifyMock.mockRestore()
    })

    test.skip("sends leaderboard of user with place order if persons is empty", async () => {
        const jwtVerifyMock = jest.spyOn(jwt, "verify").mockReturnValue({
            gameId: 1,
            persons: []
        })
        const res = await request(app)
            .post("/v1/1/leaderboard")
            .send({
                body: {
                    username: "testUser",
                    token: "token"
                }
            })
        expect(createLeaderboard.mock.calls).toHaveLength(1)
        expect(res.body.data).toEqual({
            leaderboard: jest.any(Array),
            place: jest.any(Number)
        })
        jwtVerifyMock.mockRestore()
    })
})

test("GET /:gameId/leaderboard", () => {

})