import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UsuariosRepository } from "../typeorm/repositories/UsuariosRepository";

interface IRequest {
    id: string
}

// Excluindo um Usuário
class DeleteUsuarioService {
    public async execute({ id }: IRequest): Promise<void> {
        const usuarioRepository = getCustomRepository(UsuariosRepository);

        const user = await usuarioRepository.findOne(id);
            
        if (!user) {
            throw new AppError('Usuário não encontrado!');
        }
        
        await usuarioRepository.remove(user);
    }
}

export default DeleteUsuarioService;
