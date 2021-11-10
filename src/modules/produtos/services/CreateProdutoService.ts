import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Produto from "../typeorm/entities/Produto";
import { ProdutosRepository } from "../typeorm/repositories/ProdutosRepository";

const {addDays} = require('date-fns');

interface IRequest {
    descricao: string;
    preco: number;
    qtde: number;
    dataValidade: Date;
}

// Criando Produtos src/shared/errors/AppError
class CreateProdutoService {

    public async execute({ descricao, preco, qtde, dataValidade }: IRequest): Promise<Produto> {
        dataValidade =  addDays(new Date(), 15);

        const produtoRepository = getCustomRepository(ProdutosRepository);

        // Verificando duplicidade da descrição do Produto
        const produtoExists = await produtoRepository.findByName(descricao);
        if (produtoExists) {
            throw new AppError('Descrição do Produto já existente');
        }
     
        const prod = produtoRepository.create({ descricao, preco, qtde, dataValidade });
        await produtoRepository.save(prod);
        return prod;
 
    }
}

export default CreateProdutoService;
