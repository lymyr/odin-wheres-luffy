import { prisma } from "../../lib/prisma.js"
import checkAnswer from "../../middleware/checkAnswer.js"

jest.spyOn(prisma.person, "findFirst").mockResolvedValue({
    name: "lol",
    xMinPos: 0.67,
    xMaxPos: 0.671,
    yMinPos: 0.204,
    yMaxPos: 0.21,
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
                coords: {x: 0.69, y: 0.21}
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
                coords: {x: 0.67, y: 0.20}
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
                coords: {x: 0.67, y: 0.23}
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