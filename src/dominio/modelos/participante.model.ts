type NovoParticipanteParams = {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    senha: string;
};

type RecuperarParticipanteParams = NovoParticipanteParams & {
    id: string;
};

class Participante {

    private _id?: string;
    private _nome: string;
    private _cpf: string;
    private _email: string;
    private _telefone: string;
    private _senha: string;

    private constructor(nome: string, cpf: string, email: string, telefone: string, senha: string, id?: string){
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._email = email;
        this._telefone = telefone;
        this._senha = senha;
    }

    public get id(): string | undefined {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public get cpf(): string {
        return this._cpf;
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

    public static novo(params: NovoParticipanteParams): Participante {
        return new Participante(
            params.nome,
            params.cpf,
            params.email,
            params.telefone,
            params.senha
        );
    }

    public static recuperar(params: RecuperarParticipanteParams): Participante {
        return new Participante(
            params.nome,
            params.cpf,
            params.email,
            params.telefone,
            params.senha,
            params.id
        );
    }
}

export { Participante };
