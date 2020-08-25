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

routes.get('/users', UserController.get_all_users);

routes.get('/users/:id', UserController.get_user);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        cpf: Joi.string().required().length(14),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        phone: Joi.string().required().min(10).max(11),
        address: Joi.string().required(),
        number: Joi.number().required(),
        complement: Joi.string(),
        zipcode: Joi.string().required(),
        neighborhood: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), UserController.create)

routes.put('/users/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(),
        cpf: Joi.string().length(14),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        phone: Joi.string().min(10).max(11),
        address: Joi.string(),
        number: Joi.number(),
        complement: Joi.string(),
        zipcode: Joi.string(),
        neighborhood: Joi.string(),
        city: Joi.string(),
        uf: Joi.string().length(2)
    })
}), UserController.update)

routes.delete('/users/:id', UserController.delete);

//routes.get('/orgs', OrgController.get_all_orgs);

routes.post('/orgs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OrgController.create);

// routes.post('/cases', celebrate({
//     [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown(),
//     [Segments.BODY]: Joi.object().keys({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         value: Joi.number().required()
//     })
// }), CaseController.create);

// routes.get('/cases', celebrate({
//     [Segments.QUERY]: Joi.object().keys({
//         page: Joi.number()
//     })
// }), CaseController.index);

// routes.delete('/cases/:id', celebrate({
//     [Segments.PARAMS]: Joi.object().keys({
//         id: Joi.number().required()
//     })
// }), CaseController.delete);

// routes.get('/profile', celebrate({
//     [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown()
// }), ProfileController.index);

module.exports = routes;