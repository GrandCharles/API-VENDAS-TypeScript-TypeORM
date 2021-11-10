import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Produto from "../typeorm/entities/Produto";
import { ProdutosRepository } from "../typeorm/repositories/ProdutosRepository";

interface IRequest {
    id: string
}

// Exibindo um unico Produtos
class ShowProdutoService {
    public async execute({ id }: IRequest): Promise<Produto> {
        const produtoRepository = getCustomRepository(ProdutosRepository);

        const prod = await produtoRepository.findOne(id);
        if (!prod) {
            throw new AppError('Produto não encontrado');
        }

        return prod;
    }
}

export default ShowProdutoService;
