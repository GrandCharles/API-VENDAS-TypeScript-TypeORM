import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Usuario from "../typeorm/entities/Usuario";
import { UsuariosRepository } from "../typeorm/repositories/UsuariosRepository";

// Listando Produtos
class ListUsuarioService {
    public async execute(): Promise<Usuario[]> {
        const usuarioRepository = getCustomRepository(UsuariosRepository);

        const user = await usuarioRepository.find();
        return user;
    }
}

export default ListUsuarioService;
