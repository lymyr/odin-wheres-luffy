import request from "supertest"
import jwt from "jsonwebtoken"
import app from "../../app.js";
import { prisma } from "../../lib/prisma.js";

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers()
});

afterAll(async () => {
    await prisma.$disconnect()
})

test("returns JWT with startDate, gameId, and sessionId", async () => {
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
    
    const mockedJwt = jest.spyOn(jwt, "sign")
    mockedJwt.mockReturnValue(123)

    const res = await request(app)
        .get("/v1/1")

    expect(mockedJwt).toHaveBeenCalledWith({
        startDate: new Date(),
        gameId: expect.anything(),
        persons: expect.any(Array),
        sessionId: expect.anything()
    }, expect.anything(), expect.anything())

    expect(res.body).toEqual({
        data: {
            token: 123,
        }
    })
})

describe("Returns error for invalid gameId", () => {
    test("string gameId", async () => {
        const res = await request(app)
            .get("/v1/abc")

        expect(res.statusCode).toBe(400)
    })

    test("no game found", async () => {
        const res = await request(app)
            .get("/v1/999999999")
        
        expect(res.statusCode).toBe(404)
    })
})

