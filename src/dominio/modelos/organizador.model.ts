type NovoOrganizadorParams = {
    nome: string;
    cpfOUcnpj: string;
    email: string;
    telefone: string;
    senha: string;
    fraseSecreta: string;
};
type RecuperarOrganizadorParams = {
    id: string;
    nome: string;
    cpfOUcnpj: string;
    email: string;
    telefone: string;
    senha: string;
    fraseSecreta: string;
};

class Organizador {

    private _id?: string;
    private _nome: string;
    private _cpfOUcnpj: string;
    private _email: string;
    private _telefone: string;
    private _senha: string;
    private _fraseSecreta: string;

    private constructor(nome: string, cpfOUcnpj: string, email: string, telefone: string, senha: string, fraseSecreta: string, id?: string){
        this._id = id;
        this._nome = nome;
        this._cpfOUcnpj = cpfOUcnpj;
        this._email = email;
        this._telefone = telefone;
        this._senha = senha;
        this._fraseSecreta = fraseSecreta;
    }

    public get id(): string | undefined {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public get cpfOUcnpj(): string {
        return this._cpfOUcnpj;
    }

    public get email(): string {
        return this._email;
    }

    public get telefone(): string {
        return this._telefone;
    }

    public get senha(): string {
        return this._senha;
    }

    public get fraseSecreta(): string {
        return this._fraseSecreta;
    }

    public set senha(novaSenha: string) {
        this._senha = novaSenha;
    }

    public static novo(params: NovoOrganizadorParams): Organizador {
        return new Organizador(
            params.nome,
            params.cpfOUcnpj,
            params.email,
            params.telefone,
            params.senha,
            params.fraseSecreta
        );
    }
    
    public static recuperar(params: RecuperarOrganizadorParams): Organizador {
        return new Organizador(
            params.nome,
            params.cpfOUcnpj,
            params.email,
            params.telefone,
            params.senha,
            params.fraseSecreta,
            params.id
        );
    }
}

export { Organizador };
