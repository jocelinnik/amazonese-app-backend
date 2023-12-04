import { TokenAutenticacaoDTO } from "./token-autenticacao.dto";

interface NovoOrganizadorDTO {
    nome: string;
    cpf_cnpj: string;
    email: string;
    telefone: string;
    senha_bruta: string;
}

interface LoginOrganizadorDTO {
    cpf_cnpj: string;
    senha_bruta: string;
}

interface DadosOrganizadorLogadoDTO {
    cpf_cnpj: string;
    nome: string;
}

interface OrganizadorLogadoDTO {
    organizador: DadosOrganizadorLogadoDTO;
    token: TokenAutenticacaoDTO;
}

export {
    DadosOrganizadorLogadoDTO,
    LoginOrganizadorDTO,
    NovoOrganizadorDTO,
    OrganizadorLogadoDTO
};
