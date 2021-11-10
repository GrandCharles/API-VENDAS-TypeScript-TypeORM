import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Usuario from "../typeorm/entities/Usuario";
import { UsuariosRepository } from "../typeorm/repositories/UsuariosRepository";
import Utils from '../../../config/Utils';

//import { sign } from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
import authConfig from '@config/authConfig';

interface IRequest {
    senha: string;
    email: string;
}

interface IResponse {
    usuario: Usuario;
    token: string
}

// Validando autenticação de senha e email
export default class CreateSessionsService {

    public async execute({ senha, email }: IRequest): Promise<IResponse> {
        //public async execute({ senha, email }: IRequest): Promise<Usuario> {

        const usuarioRepository = getCustomRepository(UsuariosRepository);

        const usuario = await usuarioRepository.findByEmail(email);

        if (!usuario) {
            throw new AppError('Email não encontrado');
        }

        //let encrypted = util.encryp('123456');
        const util = new Utils;
        let encrypted = util.encryp(senha);
        const senhaConfirmada = (encrypted == usuario.senha);
        if (!senhaConfirmada) {
            throw new AppError('Senha não encontrada!');
        }

        // Payload do usuario / hash md5 - grandcharlesCHVS232@ / id e tempo de duração
        const token = jwt.sign({},
            authConfig.token.secret,
            {
                subject: usuario.id,
                expiresIn: authConfig.token.expiresIn
            });

        return { usuario, token };
    }
}




