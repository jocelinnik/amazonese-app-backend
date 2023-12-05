import { Organizador } from "./organizador.model";

type LocalidadeEvento = {
    cidade: string;
    uf: string;
};

type NovoEventoParams = {
    nome: string;
    descricao: string;
    preco: number;
    localidade: LocalidadeEvento;
    categorias: string[];
    dataInicio: Date;
    dataFim: Date;
    organizador: Organizador;
};

type RecuperarEventoParams = NovoEventoParams & {
    id: string;
}

class Evento {

    private _id?: string;
    private _nome: string;
    private _descricao: string;
    private _preco: number;
    private _localidade: LocalidadeEvento;
    private _categorias: string[];
    private _dataInicio: Date;
    private _dataFim: Date;
    private _organizador: Organizador;

    private constructor(nome: string, descricao: string, preco: number, localidade: LocalidadeEvento, categorias: string[], dataInicio: Date, dataFim: Date, organizador: Organizador, id?: string){
        this._id = id;
        this._nome = nome;
        this._descricao = descricao;
        this._preco = preco;
        this._localidade = localidade;
        this._categorias = categorias;
        this._dataInicio = dataInicio;
        this._dataFim = dataFim;
        this._organizador = organizador;
    }

    public get id(): string | undefined {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public get preco(): number {
        return this._preco;
    }

    public get localidade(): LocalidadeEvento {
        return this._localidade;
    }

    public get categorias(): string[] {
        return this._categorias;
    }

    public get dataInicio(): Date {
        return this._dataInicio;
    }

    public get dataFim(): Date {
        return this._dataFim;
    }

    public get organizador(): Organizador {
        return this._organizador;
    }

    public static novo(params: NovoEventoParams): Evento {
        return new Evento(
            params.nome,
            params.descricao,
            params.preco,
            params.localidade,
            params.categorias,
            params.dataInicio,
            params.dataFim,
            params.organizador
        );
    }

    public static recuperar(params: RecuperarEventoParams): Evento {
        return new Evento(
            params.nome,
            params.descricao,
            params.preco,
            params.localidade,
            params.categorias,
            params.dataInicio,
            params.dataFim,
            params.organizador,
            params.id
        );
    }
}

export { Evento };
