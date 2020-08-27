const jwt = require('jsonwebtoken');
const authConfig = require('../utils/config');


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send('Você não possui permissão de acesso');

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.send(401).sned('Nenhum token de acesso encontrado');

    const [ scheme, token ] = parts;
    
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send('Token não formatado corretamente');

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send('Token inválido');

        req.userId = decoded.id;
        return next();
    })
}