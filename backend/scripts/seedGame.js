import { prisma } from "../lib/prisma.js"

async function seed() {
    await prisma.$transaction([
        prisma.game.create({ data: {
            id: 1,
            name: "Where's Luffy"
        }}),
        prisma.person.createMany({ data: [
            {
                id: 1,
                name: "Luffy",
                gameId: 1,
                xMinPos: 0.51,
                xMaxPos: 0.568,
                yMinPos: 0.13,
                yMaxPos: 0.195
            },
            {
                id: 2,
                name: "Zoro",
                gameId: 1,
                xMinPos: 0.58,
                xMaxPos: 0.62,
                yMinPos: 0.064,
                yMaxPos: 0.14
            },
            {
                id: 3,
                name: "Sanji",
                gameId: 1,
                xMinPos: 0.46,
                xMaxPos: 0.515,
                yMinPos: 0.39,
                yMaxPos: 0.493
            },
            {
                id: 4,
                name: "Waldo",
                gameId: 1,
                xMinPos: 0.29,
                xMaxPos: 0.32,
                yMinPos: 0.81,
                yMaxPos: 0.85
            },
            {
                id: 5,
                name: "Waldo 2",
                gameId: 1,
                xMinPos: 0.766,
                xMaxPos: 0.803,
                yMinPos: 0.253,
                yMaxPos: 0.323
            },
            {
                id: 6,
                name: "Gaimon",
                gameId: 1,
                xMinPos: 0.094,
                xMaxPos: 0.145,
                yMinPos: 0.856,
                yMaxPos: 0.936
            },
            {
                id: 7,
                name: "Bartolomeo",
                gameId: 1,
                xMinPos: 0.795,
                xMaxPos: 0.845,
                yMinPos: 0.221,
                yMaxPos: 0.301
            }
        ]})
    ])
}

try {
    await seed()
    console.log("Finished :)")
}
catch(e) {
    // ignore if already created
    if (e.code != "P2002")
        console.error(e)
    else 
        console.log("Game has already been created")
}
finally {
    prisma.$disconnect()
}
