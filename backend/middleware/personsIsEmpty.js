export default function (req, res, next) {
    if (req.decodedToken.persons.length != 0)
        return res.json({
            data: {token: req.body.token}
        })
    next()
}