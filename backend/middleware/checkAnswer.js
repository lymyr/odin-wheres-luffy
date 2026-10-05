import { prisma } from "../lib/prisma.js"

export default async function (req, res, next) {
    const persons = await prisma.person.findMany({ where: {
        gameId: req.decodedToken.gameId,
        name: req.body.person.name,
    }})

    if (!persons)
        return res.status(400).json({error: {msg: "person not found"}, data: {token: req.body.token}})

    for (const person of persons) {
        if (
            req.body.coords.x >= person.xMinPos && req.body.coords.x <= person.xMaxPos &&
            req.body.coords.y >= person.yMinPos && req.body.coords.y <= person.yMaxPos
        ) {
            const filteredPersons = []
            for (const person of req.decodedToken.persons) {
                if (person.id != req.body.person.id) 
                    filteredPersons.push(person)  
            }
            req.decodedToken.persons = filteredPersons
            return next()
        }
    }
    
    
    res.json({data: {token: req.body.token }})
}