const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OrgController = require('./controllers/OrgController');
const CaseController = require('./controllers/CaseController');
const UserController = require('./controllers/UserController');
//const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// routes.post('/sessions', celebrate({
//     [Segments.BODY]: Joi.object().keys({
//         id: Joi.string().required()
//     })
// }), SessionController.create);

routes.get('/orgs', OrgController.index);

routes.post('/orgs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OrgControllerr.create);

routes.post('/cases', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), CaseController.create);

routes.get('/cases', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), CaseController.index);

routes.delete('/cases/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CaseController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown()
}), ProfileController.index);

module.exports = routes;