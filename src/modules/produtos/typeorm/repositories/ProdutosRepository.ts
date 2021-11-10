import {EntityRepository, Repository} from "typeorm";

import Produto from '../entities/Produto';

@EntityRepository(Produto)
export class ProdutosRepository extends Repository<Produto> {
    
    public async findByName(descricao: string): Promise<Produto | undefined> {

        const prod = await this.findOne({where:{descricao,},});
        
        return prod;
    }
}

export default ProdutosRepository;