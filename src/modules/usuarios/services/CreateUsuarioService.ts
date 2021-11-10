import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Usuario from "../typeorm/entities/Usuario";
import { UsuariosRepository } from "../typeorm/repositories/UsuariosRepository";
import Utils from '../../../config/Utils';

const { addDays } = require('date-fns');

interface IRequest {
    //id: string;
    login: string
    senha: string;
    nome: string;
    email: string;
    //avatar: string;
    dataValidade: Date;
    ativo: boolean;
}

// Criando usuario src/shared/errors/AppError
class CreateUsuarioService {

    public async execute({ login, senha, nome, email, dataValidade, ativo }: IRequest): Promise<Usuario> {
        dataValidade = addDays(new Date(), 45);

        //let encrypted = util.encryp('123456');
        const util = new Utils;
        let encrypted = util.encryp(senha);
        //let decrypted = util.decrypt(encrypted);

        const usuarioRepository = getCustomRepository(UsuariosRepository);

        // Verificando duplicidade de usuario
        const loginExists = await usuarioRepository.findByLogin(login);
        if (loginExists) {
            throw new AppError('Usuário já existente');
        }

        // Verificando duplicidade de usuario
        const emailExists = await usuarioRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('Email já existente');
        }

        const user = usuarioRepository.create({
            login,
            senha: encrypted,
            nome,
            email,
            dataValidade,
            ativo
        });
        await usuarioRepository.save(user);

        return user;
    }
}

export default CreateUsuarioService;
