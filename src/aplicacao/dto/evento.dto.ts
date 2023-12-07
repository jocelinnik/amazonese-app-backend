interface LocalidadeEventoDTO {
    cidade: string;
    uf: string;
}

interface NovoEventoDTO {
    nome: string;
    categorias: string[];
    descricao: string;
    preco: number;
    localidade: LocalidadeEventoDTO;
    data_inicio: Date;
    data_fim: Date;
    cpf_cnpj_organizador: string;
}

interface DadosEventoDTO {
    id: string;
    nome: string;
    categorias: string[];
    descricao: string;
    preco: number;
    localidade: LocalidadeEventoDTO;
    data_inicio: Date;
    data_fim: Date;
}

interface EventoParaFavoritarDTO {
    id_evento: string;
    cpf_participante: string;
}

export {
    DadosEventoDTO,
    EventoParaFavoritarDTO,
    LocalidadeEventoDTO,
    NovoEventoDTO
};
