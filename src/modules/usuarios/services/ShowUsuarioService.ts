import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Usuario from "../typeorm/entities/Usuario";
import { UsuariosRepository } from "../typeorm/repositories/UsuariosRepository";

interface IRequest {
    id: string
}

// Exibindo um unico Usuário
class ShowUsuarioService {
    public async execute({ id }: IRequest): Promise<Usuario> {
        const usuariosRepository = getCustomRepository(UsuariosRepository);

        const user = await usuariosRepository.findOne(id);
        if (!user) {
            throw new AppError('Usuário não encontrado!');
        }

        return user;
    }
}

export default ShowUsuarioService;
