import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProdutosRepository } from "../typeorm/repositories/ProdutosRepository";

interface IRequest {
    id: string
}

// Excluindo um  Produto
class DeleteProdutoService {
    public async execute({ id }: IRequest): Promise<void> {
        const produtoRepository = getCustomRepository(ProdutosRepository);

        const prod = await produtoRepository.findOne(id);
            
        if (!prod) {
            throw new AppError('Produto não encontrado');
        }
        
        await produtoRepository.remove(prod);
    }
}

export default DeleteProdutoService;
