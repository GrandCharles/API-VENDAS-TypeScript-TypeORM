import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('produtos')
class Produto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    descricao: string;

    @Column('decimal')
    preco: number;

    @Column('int')
    qtde: number;

    @Column('date')
    dataValidade: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
   
}

export default Produto;