import { prisma } from "../../lib/prisma.js"
import checkAnswer from "../../middleware/checkAnswer.js"

jest.spyOn(prisma.person, "findMany").mockResolvedValue([{
    name: "lol",
    xMinPos: 0.67,
    xMaxPos: 0.671,
    yMinPos: 0.204,
    yMaxPos: 0.21,
}])


describe("answer verification middleware", () => {
    test("pops person within coords", async () => {
        const req = {
            decodedToken: {
                gameId: 1,
                persons: [{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name:"abc", id: 5}]  
            },
            body: {
                person: {id: 1, name: "lol"},
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
        expect(req.decodedToken.persons).toEqual([{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name:"abc", id: 5}] )
    })

    test("persons arr doesnt change due lower xPos", async () => {
        const req = {
            decodedToken: {
                gameId: 1,
                persons: [{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name:"abc", id: 5}]
            },
            body: {
                person: {id: 1, name: "lol"},
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

        expect(req.decodedToken.persons).toEqual([{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name:"abc", id: 5}])
    })

    test("persons arr doesnt change due higher xPos", async () => {
        const req = {
            decodedToken: {
                gameId: 1,
                persons: [{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name:"abc", id: 5}] 
            },
            body: {
                person: {id: 1, name: "lol"},
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

        expect(req.decodedToken.persons).toEqual([{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name:"abc", id: 5}])

    })
    test("persons arr doesnt change due lower yPos", async () => {
        const req = {
            decodedToken: {
                gameId: 1,
                persons: [{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name:"abc", id: 5}] 
            },
            body: {
                person: {id: 1, name: "lol"},
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

        expect(req.decodedToken.persons).toEqual([{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name:"abc", id: 5}])
    })

    test("persons arr doesnt change due higher yPos", async () => {
        const req = {
            decodedToken: {
                gameId: 1,
                persons: [{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name:"abc", id: 5}] 
            },
            body: {
                person: {id: 1, name: "lol"},
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

        expect(req.decodedToken.persons).toEqual([{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name:"abc", id: 5}])
    })


    describe("duplicate person name", () => {
        beforeAll(() => {
            jest.restoreAllMocks()
            jest.spyOn(prisma.person, "findMany").mockResolvedValue([
                {
                    name: "lol",
                    xMinPos: 0.67,
                    xMaxPos: 0.671,
                    yMinPos: 0.204,
                    yMaxPos: 0.21,
                },
                {
                    name: "lol",
                    xMinPos: 0.1,
                    xMaxPos: 0.2,
                    yMinPos: 0.1,
                    yMaxPos: 0.2,
                },
            ])
        })

        test("pops the first person", async () => {
            const req = {
                decodedToken: {
                    gameId: 1,
                    persons: [{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name: "lol", id: 7},{name:"abc", id: 5}]  
                },
                body: {
                    person: {id: 1, name: "lol"},
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
            expect(req.decodedToken.persons).toEqual([{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 7},{name:"abc", id: 5}] )
        })

        test("pops the second person", async () => {
            const req = {
                decodedToken: {
                    gameId: 1,
                    persons: [{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name: "lol", id: 7},{name:"abc", id: 5}]  
                },
                body: {
                    person: {id: 7, name: "lol"},
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
            expect(req.decodedToken.persons).toEqual([{name: "gojo", id: 2}, {name: "optimum pride", id: 3},{name: "lol", id: 1},{name:"abc", id: 5}] )
        })
    })
})