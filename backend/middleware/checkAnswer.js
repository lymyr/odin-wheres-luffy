import { prisma } from "../lib/prisma.js"

export default async function (req, res, next) {
    const person = await prisma.person.findFirst({ where: {
        gameId: req.decodedToken.gameId,
        name: req.body.person
    }})

    if (!person)
        return res.status(400).json({error: {msg: "person not found"}, data: {token: req.body.token}})
    
    if (
        req.body.coords.x >= person.xMinPos && req.body.coords.x <= person.xMaxPos &&
        req.body.coords.y >= person.yMinPos && req.body.coords.y <= person.yMaxPos
    ) {
        const filteredPersons = []
        for (const person of req.decodedToken.persons) {
            if (person != req.body.person) 
                filteredPersons.push(person)  
        }
        req.decodedToken.persons = filteredPersons
        return next()
    }
    
    res.json({data: {token: req.body.token }})
}