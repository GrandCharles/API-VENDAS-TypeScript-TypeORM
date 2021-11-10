import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import UsuariosController from '../controllers/UsuariosController';
import UsuariosAvatarController from '../controllers/UsuariosAvatarController';
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import uploadConfig from "@config/upload";

const usuariosRouter = Router();
const usuariosController = new UsuariosController();
const usuariosAvatarController = new UsuariosAvatarController();
const upload = multer(uploadConfig);

// Rota de Inclusão do usuário
usuariosRouter.post('/',celebrate({[Segments.BODY]: 
    {
    login: Joi.string().required(),
    senha: Joi.string().required(),
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    //avatar: ,
    dataValidade: Joi.date().required(),
    ativo: Joi.boolean()
    }
}), 
usuariosController.create);


// Rota de Alteração do usuario
usuariosRouter.put('/:id',celebrate({
    [Segments.BODY]: 
    {
        login: Joi.string().required(),
        senha: Joi.string().required(),
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        //avatar: ,
        dataValidade: Joi.date().required(),
        ativo: Joi.boolean()
        },
    [Segments.PARAMS]: 
    {
        id: Joi.string().uuid().required()
    }
}), 
usuariosController.update);


// Rota de Exclusão
usuariosRouter.delete('/:id',celebrate({
    [Segments.PARAMS]: 
    {
        id: Joi.string().uuid().required()
    }
}),
usuariosController.delete);


// Rota de listar todos usuarios
usuariosRouter.get('/',isAuthenticated, usuariosController.list);


// Rota de selecionar um registro
usuariosRouter.get('/:id',celebrate({
    [Segments.PARAMS]: 
    {
        id: Joi.string().uuid().required()
    }
}),
usuariosController.show);

// Rota para salvar o avatar
usuariosRouter.patch(
    '/avatar',                             // Rota
    isAuthenticated,                       // Autenticação
    upload.single('avatar'),               // middleware para pegar o arquivo
    usuariosAvatarController.update        // Atualiza
);

export default usuariosRouter;
