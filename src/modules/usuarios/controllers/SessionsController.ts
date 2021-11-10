import { Request, Response } from "express";
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {

    // Inserindo usuário
    public async create(request: Request, response: Response): Promise<Response> {
        const {email, senha} = request.body;    

        const createSession = new CreateSessionsService();

        const user = await createSession.execute({senha, email});

        return response.json(user);
    }
}

