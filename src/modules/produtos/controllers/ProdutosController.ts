import { Request, Response } from "express";
import CreateProdutoService from '../services/CreateProdutoService';
import UpdateProdutoService from '../services/UpdateProdutoService';
import DeleteProdutoService from '../services/DeleteProdutoService';
import ListProdutoService from '../services/ListProdutoService';
import ShowProdutoService from '../services/ShowProdutoService';


class ProdutosController {

    // Inserindo produto
    public async create(request: Request, response: Response): Promise<Response> {
        const {descricao, preco, qtde, dataValidade} = request.body;    

        const novoProduto = new CreateProdutoService();

        const produto = await novoProduto.execute({descricao, preco, qtde, dataValidade});

        return response.json(produto);
    }

    // Alterando Produto
    public async update(request: Request, response: Response): Promise<Response> {
        const {id}  = request.params;
        const {descricao, preco, qtde, dataValidade} = request.body;  

        const alteraProduto = new UpdateProdutoService();

        const produto = await alteraProduto.execute({id, descricao, preco, qtde, dataValidade});

        return response.json(produto);
    }

    // Excluindo produto
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteProduto = new DeleteProdutoService();
        await deleteProduto.execute({ id });

        return response.json([]);
    }



    // Listando os Produtos
    public async list(request: Request, response: Response): Promise<Response> {
        const listProdutos = new ListProdutoService();

        const produtos = await listProdutos.execute();

        return response.json(produtos);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProduto = new ShowProdutoService();
        const produto = await showProduto.execute({ id });

        return response.json(produto);
    }

}

export default ProdutosController;