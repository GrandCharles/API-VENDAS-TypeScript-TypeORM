import {EntityRepository, Repository} from "typeorm";

import Usuario from '../entities/Usuario';

@EntityRepository(Usuario)
export class UsuariosRepository extends Repository<Usuario> {
    
    public async findById(id: string): Promise<Usuario | undefined> {

        const user = await this.findOne({where:{id,},});
        
        return user;
    }

    public async findByLogin(login: string): Promise<Usuario | undefined> {

        const user = await this.findOne({where:{login,},});
        
        return user;
    }

    public async findByEmail(email: string): Promise<Usuario | undefined> {

        const user = await this.findOne({where:{email,},});
        
        return user;
    }

}

export default UsuariosRepository;