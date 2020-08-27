const jwt = require('jsonwebtoken');
const authConfig = require('../utils/config');


module.exports = (req, res, next) => {
    const token = req.headers.authorization || req.cookies.auth;

    if(!authHeader)
        return res.status(401).send('Você não possui permissão de acesso');

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send('Token inválido');

        req.userId = decoded.id;
        return next();
    })
}