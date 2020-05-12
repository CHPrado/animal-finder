const { celebrate, Segments, Joi } = require('celebrate');
const express = require('express');

const AnimalController = require('./controller/AnimalController');
const CommuniqueController = require('./controller/CommuniqueController');
const LoginController = require('./controller/LoginController');
const OwnerAnimalsController = require('./controller/OwnerAnimalsController');
const OwnerController = require('./controller/OwnerController');

class Routes {
  constructor() {
    this.routes = express.Router();

    this.setRoutes();
  }

  setRoutes() {
    // login
    this.routes.post('/login', celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    }), LoginController.login);

    // lista de donos
    this.routes.get('/owner', OwnerController.index);

    // lista de animais
    this.routes.get('/animal', celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().required(),
      }),
    }), AnimalController.index);

    // lista de animais do dono
    this.routes.get('/owner-animals', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required(),
      }).unknown(),
    }), OwnerAnimalsController.index);

    // criar dono
    this.routes.post('/owner', celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }), OwnerController.create);

    // criar animal
    this.routes.post('/animal', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required(),
      }).unknown(),
      [Segments.BODY]: Joi.object().keys({
        picture: Joi.string().required(),
        name: Joi.string().required(),
        age: Joi.number().integer().required(),
        info: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
        status: Joi.number().integer().required()
          .min(0)
          .max(2),
      }),
    }), AnimalController.create);

    // criar comunicado
    this.routes.post('/communique', celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        info: Joi.string().required(),
        animalId: Joi.number().required(),
      }),
    }), CommuniqueController.create);

    // editar animal
    this.routes.post('/animal/:id', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required(),
      }).unknown(),
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        picture: Joi.string().required(),
        name: Joi.string().required(),
        age: Joi.number().integer().required(),
        info: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
        status: Joi.number().integer().required()
          .min(0)
          .max(2),
      }),
    }), AnimalController.update);

    // excluir animal
    this.routes.delete('/animal/:id', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required(),
      }).unknown(),
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      }),
    }), AnimalController.delete);
  }
}

module.exports = new Routes().routes;
