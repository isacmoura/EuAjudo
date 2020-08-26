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

routes.get('/help/:user_id/:case_id', UserController.help_case);

routes.get('/users/:id/cases', UserController.get_all_user_cases);

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

routes.delete('/help/:user_id/:case_id', UserController.delete_cause);

routes.get('/orgs', OrgController.get_all_orgs);

routes.get('/orgs/:id', OrgController.get_org);

routes.post('/orgs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        responsible: Joi.string(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phone: Joi.string().min(10).max(11),
        address: Joi.string().required(),
        number: Joi.number().required(),
        complement: Joi.string(),
        zipcode: Joi.string().required(),
        neighborhood: Joi.string(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
        cnpj: Joi.string().length(18),
        type: Joi.string().required()
    })
}), OrgController.create);

routes.put('/orgs/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(),
        responsible: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        phone: Joi.string().min(10).max(11),
        address: Joi.string(),
        number: Joi.number(),
        complement: Joi.string(),
        zipcode: Joi.string(),
        neighborhood: Joi.string(),
        city: Joi.string(),
        uf: Joi.string().length(2),
        cnpj: Joi.string().length(18),
        type: Joi.string()
    })
}), OrgController.update);

routes.delete('/orgs/:id', OrgController.delete);


routes.get('/cases', CaseController.get_all_cases);

routes.get('/cases/org/:org_id', CaseController.get_cases_from_org);

routes.get('/cases/:id', CaseController.get_case)

routes.post('/cases/:org_id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
    })
}), CaseController.create);

routes.put('/cases/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string(),
        description: Joi.string(),
    })
}), CaseController.update);

routes.delete('/cases/:id', CaseController.delete);

// routes.get('/profile', celebrate({
//     [Segments.HEADERS]: Joi.object({authorization: Joi.string().required()}).unknown()
// }), ProfileController.index);

module.exports = routes;