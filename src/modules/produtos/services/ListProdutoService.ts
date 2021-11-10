import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Produto from "../typeorm/entities/Produto";
import { ProdutosRepository } from "../typeorm/repositories/ProdutosRepository";

// Listando Produtos
class ListProdutoService {
    public async execute(): Promise<Produto[]> {
        const produtoRepository = getCustomRepository(ProdutosRepository);

        const prod = await produtoRepository.find();
        return prod;
    }
}

export default ListProdutoService;
