// Criando sobreposição de métodos do express
// Acrescentando o objeto usuario
// no arquivo tsconfig.json acrestar na propriedade // typeRoots
declare namespace Express {
    export interface Request {
        usuario: { id: string }
    };
}