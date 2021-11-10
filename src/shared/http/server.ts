import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import {errors} from 'celebrate';

// Importando a rota
import routes from './routes';
import AppError from '../../shared/errors/AppError';
import '../typeorm';

const app = express();
app.use(cors());

// Usando padrão Json
app.use(express.json());

// pega todas as rotas
app.use(routes);

// Captura erros
app.use(errors());


// Criando um middleware para interceptar mensagens de exceções
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {

    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ status: 'error', message: error.message });
    
    }

    return response.status(500).json({ status: 'error', message: 'Internal Server Error' })
})

// Chamando o servidor
app.listen(3333, () => {
    console.log('NODE Usando a Porta: 3333! 🏆')
});

