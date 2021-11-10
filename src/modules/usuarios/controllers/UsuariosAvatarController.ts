import { Request, Response } from "express";
import UpdateUsuarioAvatarService from '../services/UpdateUsuarioAvatarService';

export default class UsuariosAvatarController {

    // Alterando Avatar Usuário
    public async update(request: Request, response: Response): Promise<Response> {
        const alteraAvatar = new UpdateUsuarioAvatarService();

        const usuario = alteraAvatar.execute({
            idUser: request.usuario.id,
            avatarFileName: request.usuario.id
        });
        return response.json(usuario);
    }
}

