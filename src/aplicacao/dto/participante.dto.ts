import { TokenAutenticacaoDTO } from "./token-autenticacao.dto";

interface NovoParticipanteDTO {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    senha_bruta: string;
    frase_secreta_bruta: string;
}

interface LoginParticipanteDTO {
    cpf: string;
    senha_bruta: string;
}

interface RedefinirSenhaParticipanteDTO {
    cpf: string;
    frase_secreta_bruta: string;
    nova_senha_bruta: string;
}

interface DadosParticipanteLogadoDTO {
    cpf: string;
    nome: string;
}

interface ParticipanteLogadoDTO {
    participante: DadosParticipanteLogadoDTO;
    token: TokenAutenticacaoDTO;
}

export {
    DadosParticipanteLogadoDTO,
    LoginParticipanteDTO,
    NovoParticipanteDTO,
    ParticipanteLogadoDTO,
    RedefinirSenhaParticipanteDTO
};
