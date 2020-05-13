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
        email: Joi.string().required().email()
          .messages({
            'string.empty': 'E-Mail inválido',
            'string.email': 'E-Mail inválido',
            'any.required': 'E-Mail inválido',
          }),
        password: Joi.string().required()
          .messages({
            'string.empty': 'Insira uma senha.',
            'any.required': 'Insira uma senha.',
          }),
      }),
    }), LoginController.login);

    // lista de donos
    this.routes.get('/owner', OwnerController.index);

    // lista de animais
    this.routes.get('/animal', celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().required()
          .messages({
            'number.base': 'Número de paginação deve ser do tipo inteiro.',
            'number.empty': 'Número de paginação não informado.',
            'any.required': 'Número de paginação não informado.',
          }),
      }),
    }), AnimalController.index);

    // lista de animais do dono
    this.routes.get('/owner-animals', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
          .messages({
            'number.base': 'Id do dono deve ser do tipo inteiro.',
            'string.empty': 'Id do dono não informado.',
            'any.required': 'Id do dono não informado.',
          }),
      }).unknown(),
    }), OwnerAnimalsController.index);

    // criar dono
    this.routes.post('/owner', celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
          .messages({
            'string.empty': 'Nome não informado',
            'any.required': 'Nome não informado',
          }),
        email: Joi.string().required().email()
          .messages({
            'string.empty': 'E-Mail inválido',
            'string.email': 'E-Mail inválido',
            'any.required': 'E-Mail inválido',
          }),
        phone: Joi.string().required()
          .messages({
            'string.empty': 'Telefone não informado.',
            'any.required': 'Telefone não informado.',
          }),
        password: Joi.string().required()
          .messages({
            'string.empty': 'Insira uma senha.',
            'any.required': 'Insira uma senha.',
          }),
      }),
    }), OwnerController.create);

    // criar animal
    this.routes.post('/animal', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
          .messages({
            'number.base': 'Id do dono deve ser do tipo inteiro.',
            'string.empty': 'Id do dono não informado.',
            'any.required': 'Id do dono não informado.',
          }),
      }).unknown(),
      [Segments.BODY]: Joi.object().keys({
        picture: Joi.string().required()
          .messages({
            'string.empty': 'Insira uma foto do seu pet.',
            'any.required': 'Insira uma foto do seu pet.',
          }),
        name: Joi.string().required()
          .messages({
            'string.empty': 'Nome do pet não informado',
            'any.required': 'Nome do pet não informado',
          }),
        age: Joi.number().integer().required()
          .messages({
            'number.base': 'A idade deve ser do tipo inteiro.',
            'any.required': 'Idade do pet não informada.',
          }),
        info: Joi.string().required()
          .messages({
            'string.empty': 'Insira alguma informação.',
            'any.required': 'Insira alguma informação.',
          }),
        city: Joi.string().required()
          .messages({
            'string.empty': 'Cidade de desaparecimento não informada.',
            'any.required': 'Cidade de desaparecimento não informada.',
          }),
        uf: Joi.string().required().length(2)
          .messages({
            'string.empty': 'Estado de desaparecimento não informado.',
            'string.length': 'Estado deve conter {#limit} dígitos.',
            'any.required': 'Estado de desaparecimento não informado.',
          }),
        status: Joi.number().integer().required()
          .min(0)
          .max(2)
          .messages({
            'string.empty': 'Status do animal não informado.',
            'string.min': 'Valor do status do pet deve estar entre 0 e 2.',
            'string.max': 'Valor do status do pet deve estar entre 0 e 2.',
            'any.required': 'Status do animal não informado.',
          }),
      }),
    }), AnimalController.create);

    // criar comunicado
    this.routes.post('/communique', celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
          .messages({
            'string.empty': 'Informe seu nome.',
            'any.required': 'Informe seu nome.',
          }),
        phone: Joi.string().required()
          .messages({
            'string.empty': 'Informe seu telefone.',
            'any.required': 'Informe seu telefone.',
          }),
        info: Joi.string().required()
          .messages({
            'string.empty': 'Faça uma breve descrição.',
            'any.required': 'Faça uma breve descrição.',
          }),
        animalId: Joi.number().required()
          .messages({
            'number.base': 'Id do animal deve ser do tipo inteiro.',
            'string.empty': 'Id do animal não informado.',
            'any.required': 'Id do animal não informado.',
          }),
      }),
    }), CommuniqueController.create);

    // editar animal
    this.routes.post('/animal/:id', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
          .messages({
            'number.base': 'Id do dono deve ser do tipo inteiro.',
            'string.empty': 'Id do dono não informado.',
            'any.required': 'Id do dono não informado.',
          }),
      }).unknown(),
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
          .messages({
            'number.base': 'Id do animal deve ser do tipo inteiro.',
            'string.empty': 'Id do animal não informado.',
            'any.required': 'Id do animal não informado.',
          }),
      }),
      [Segments.BODY]: Joi.object().keys({
        picture: Joi.string().required()
          .messages({
            'string.empty': 'Insira uma foto do seu pet.',
            'any.required': 'Insira uma foto do seu pet.',
          }),
        name: Joi.string().required()
          .messages({
            'string.empty': 'Nome do pet não informado',
            'any.required': 'Nome do pet não informado',
          }),
        age: Joi.number().integer().required()
          .messages({
            'number.base': 'A idade deve ser do tipo inteiro.',
            'any.required': 'Idade do pet não informada.',
          }),
        info: Joi.string().required()
          .messages({
            'string.empty': 'Insira alguma informação.',
            'any.required': 'Insira alguma informação.',
          }),
        city: Joi.string().required()
          .messages({
            'string.empty': 'Cidade de desaparecimento não informada.',
            'any.required': 'Cidade de desaparecimento não informada.',
          }),
        uf: Joi.string().required().length(2)
          .messages({
            'string.empty': 'Estado de desaparecimento não informado.',
            'string.length': 'Estado deve conter {#limit} dígitos.',
            'any.required': 'Estado de desaparecimento não informado.',
          }),
        status: Joi.number().integer().required()
          .min(0)
          .max(2)
          .messages({
            'string.empty': 'Status do animal não informado.',
            'string.min': 'Valor do status do pet deve estar entre 0 e 2.',
            'string.max': 'Valor do status do pet deve estar entre 0 e 2.',
            'any.required': 'Status do animal não informado.',
          }),
      }),
    }), AnimalController.update);

    // excluir animal
    this.routes.delete('/animal/:id', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
          .messages({
            'number.base': 'Id do dono deve ser do tipo inteiro.',
            'string.empty': 'Id do dono não informado.',
            'any.required': 'Id do dono não informado.',
          }),
      }).unknown(),
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
          .messages({
            'number.base': 'Id do animal deve ser do tipo inteiro.',
            'string.empty': 'Id do animal não informado.',
            'any.required': 'Id do animal não informado.',
          }),
      }),
    }), AnimalController.delete);
  }
}

module.exports = new Routes().routes;
