import { Router } from "express";
import SessionsController from '../controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionRoutes = Router();
const sessionController = new SessionsController();

// Rota de Inclusão do usuário
sessionRoutes.post('/',celebrate({[Segments.BODY]: 
    {
    senha: Joi.string().required(),
    email: Joi.string().email().required(),
    }
}), 
sessionController.create);

export default sessionRoutes;
