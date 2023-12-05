interface NovoEventoDTO {
    nome: string;
    descricao: string;
    preco: number;
    localidade: {
        cidade: string;
        uf: string;
    };
    categorias: string[];
    data_inicio: Date;
    data_fim: Date;
    cpf_cnpj_organizador: string;
}

interface DadosEventoDTO {
    nome: string;
    descricao: string;
    preco: number;
    localidade: {
        cidade: string;
        uf: string;
    };
    data_inicio: Date;
    data_fim: Date;
}

interface EventoParaFavoritarDTO {
    id_evento: string;
    cpf_participante: string;
}

export { DadosEventoDTO, EventoParaFavoritarDTO, NovoEventoDTO };
