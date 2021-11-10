import { Request, Response } from "express";
import CreateUsuarioService from '../services/CreateUsuarioService';
import UpdateUsuarioService from '../services/UpdateUsuarioService';
import DeleteUsuarioService from '../services/DeleteUsuarioService';
import ListUsuarioService from '../services/ListUsuarioService';
import ShowUsuarioService from '../services/ShowUsuarioService';

export default class UsuariosController {

    // Inserindo usuário
    public async create(request: Request, response: Response): Promise<Response> {
        const {login, nome, email, senha, dataValidade, ativo} = request.body;    

        const novoUsuario = new CreateUsuarioService();

        const user = await novoUsuario.execute({login, senha, nome, email, dataValidade, ativo});

        return response.json(user);
    }


    // Alterando Usuário
    public async update(request: Request, response: Response): Promise<Response> {
        const {id}  = request.params;
        const {login, nome, email, senha, dataValidade, ativo} = request.body;  

        const alteraUsuario = new UpdateUsuarioService();

        const user = await alteraUsuario.execute({id, login, senha, nome, email, dataValidade, ativo});

        return response.json(user);
    }


    // Excluindo usuario
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteUsuario = new DeleteUsuarioService();
        await deleteUsuario.execute({ id });

        return response.json([]);
    }


    // Listando os Usuario
    public async list(request: Request, response: Response): Promise<Response> {
        const listUsuarios = new ListUsuarioService();
        //console.log(request.usuario.id);

        const users = await listUsuarios.execute();

        return response.json(users);
    }

    
    // Buscando um usuário
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showUsuario = new ShowUsuarioService();
        
        const user = await showUsuario.execute({ id });

        return response.json(user);
    }
}

