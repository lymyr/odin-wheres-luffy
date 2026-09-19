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
            }
        ]})
    ])
}

try {
    await seed()
    console.log("Finished :)")
}
catch(e) {
    console.error(e)
}
finally {
    prisma.$disconnect()
}
