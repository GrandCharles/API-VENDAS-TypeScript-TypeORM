import { Router } from "express";
import ProdutosController from '../controllers/ProdutosController';
import { celebrate, Joi, Segments } from 'celebrate';

const produtosRoutes = Router();
const produtosController = new ProdutosController();

// Rota de Inclusão
produtosRoutes.post('/',celebrate({[Segments.BODY]: 
    {
        descricao: Joi.string().required(),
        preco: Joi.number().precision(2).required(),
        qtde: Joi.number().required(),
        dataValidade: Joi.date()
    }
}), 
produtosController.create);


// Rota de Alteração
produtosRoutes.put('/',celebrate({
    [Segments.BODY]: 
    {
        descricao: Joi.string().required(),
        preco: Joi.number().precision(2).required(),
        qtde: Joi.number().required(),
        dataValidade: Joi.date()
    },
    [Segments.PARAMS]: 
    {
        id: Joi.string().uuid().required()
    }
}), 
produtosController.update);


// Rota de Exclusão
produtosRoutes.delete('/:id',celebrate({
    [Segments.PARAMS]: 
    {
        id: Joi.string().uuid().required()
    }
}),
produtosController.delete);

// Rota de listar tudo
produtosRoutes.get('/', produtosController.list);


// Rota de Listar um registro
produtosRoutes.get('/:id',celebrate({
    [Segments.PARAMS]: 
    {
        id: Joi.string().uuid().required()
    }
}),
produtosController.show);

export default produtosRoutes;
