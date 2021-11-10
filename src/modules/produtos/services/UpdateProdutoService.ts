import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Produto from "../typeorm/entities/Produto";
import { ProdutosRepository } from "../typeorm/repositories/ProdutosRepository";

interface IRequest {
    id: string;
    descricao: string;
    preco: number;
    qtde: number;
    dataValidade: Date;
}

// Alterando um Produtos
class UpdateProdutoService {
    public async execute({ id, descricao, preco, qtde, dataValidade }: IRequest): Promise<Produto> {

        const produtoRepository = getCustomRepository(ProdutosRepository);

        const prod = await produtoRepository.findOne(id);
        if (!prod) {
            throw new AppError('Produto não encontrado');
        }

        const produtoExists = await produtoRepository.findByName(descricao);
        if (produtoExists && (descricao != prod.descricao)) {
            throw new AppError('Descrição do Produto já existente');
        }   

        prod.descricao = descricao;
        prod.preco = preco;
        prod.qtde = qtde;
        prod.dataValidade = dataValidade;

        await produtoRepository.save(prod);

        return prod;
    }
}

export default UpdateProdutoService;
