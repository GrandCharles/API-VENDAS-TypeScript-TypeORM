import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Usuario from "../typeorm/entities/Usuario";
import { UsuariosRepository } from "../typeorm/repositories/UsuariosRepository";
import Utils from '../../../config/Utils';

interface IRequest {
    id: string;
    login: string
    senha: string;
    nome: string;
    email: string;
    //avatar: string;
    dataValidade: Date;
    ativo: boolean;
}

// Alterando um usuário
class UpdateUsuarioService {
    public async execute({ id, login, senha, nome, email, dataValidade, ativo }: IRequest): Promise<Usuario | undefined> {
        const util = new Utils;

        //let encrypted = util.encryp('123456');
        let encrypted = util.encryp(senha);
        let decrypted = util.decrypt(encrypted);
        senha = encrypted;
      
        const usuarioRepository = getCustomRepository(UsuariosRepository);

        const user = await usuarioRepository.findOne(id);
        if (!user) {
            throw new AppError('Usuário não encontrado!');
        }
        
        // Verificando duplicidade de usuario
        const loginExists = await usuarioRepository.findByLogin(login);
        /*
        if (loginExists && (login != user.login)) {
            throw new AppError('Usuário já existente');
        }
        */

        // Verificando duplicidade de usuario
        const emailExists = await usuarioRepository.findByEmail(email);
        /*
        if (emailExists && (email != user.email)) {
            throw new AppError('Email já existente');
        }
        */
        user.login = login;
        user.senha = senha;
        user.nome = nome;
        user.email = email;
        user.dataValidade = dataValidade;
        user.ativo = ativo;

        await usuarioRepository.save(user);

        return user;
    }
}

export default UpdateUsuarioService;
