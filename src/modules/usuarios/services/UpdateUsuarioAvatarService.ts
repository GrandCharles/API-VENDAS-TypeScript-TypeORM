import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import path from 'path';
import fileSystem from 'fs';
import Usuario from "../typeorm/entities/Usuario";
import { UsuariosRepository } from "../typeorm/repositories/UsuariosRepository";
import uploadConfig from '@config/upload';

interface IRequest {
    idUser: string
    avatarFileName: string;
}

// Criando usuario src/shared/errors/AppError
export default class UpdateUsuarioAvatarService {

    public async execute({ idUser, avatarFileName }: IRequest): Promise<Usuario> {
        const usuarioRepository = getCustomRepository(UsuariosRepository);

        const user = await usuarioRepository.findById(idUser);
        if (!user) {
            throw new AppError('Usuário não encontrado!');
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);  

            const userAvatarFileExist = await fileSystem.promises.stat(userAvatarFilePath);
            if (userAvatarFileExist){
                // apaga o arquivo
                await fileSystem.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await usuarioRepository.save(user);

        return user;
    }
}

