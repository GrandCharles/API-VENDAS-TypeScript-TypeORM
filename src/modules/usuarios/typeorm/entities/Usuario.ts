import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('usuarios')
class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login: string;

    @Column()
    senha: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Column('date')
    dataValidade: Date;

    @Column()
    ativo: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Usuario;    