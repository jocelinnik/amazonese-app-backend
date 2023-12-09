import { LoginParticipanteDTO, ParticipanteLogadoDTO } from "@/aplicacao/dto/participante.dto";
import { CifradorSegredos } from "@/aplicacao/providers/cifrador-segredos"
import { GerenciadorTokenAutenticacao } from "@/aplicacao/providers/gerenciador-tokens-autenticacao";
import { ParticipantesRepository } from "@/dominio/repositorios/participantes.repository";

type RealizarLoginParticipanteParams = {
    cifradorSenha: CifradorSegredos;
    gerenciadorToken: GerenciadorTokenAutenticacao;
    repository: ParticipantesRepository;
};

class RealizarLoginParticipante {

    private _cifradorSenha: CifradorSegredos;

    private _gerenciadorToken: GerenciadorTokenAutenticacao;

    private _repository: ParticipantesRepository;

    public constructor(params: RealizarLoginParticipanteParams){
        this._cifradorSenha = params.cifradorSenha;
        this._gerenciadorToken = params.gerenciadorToken;
        this._repository = params.repository;
    }

    public async executar(input: LoginParticipanteDTO): Promise<ParticipanteLogadoDTO> {
        const dadosParticipante = await this._repository.buscarPorCpf(input.cpf);

        if(!await this._cifradorSenha.comparar(input.senha_bruta, dadosParticipante.senha))
            throw new Error("A senha de acesso está incorreta");

        const dadosParticipanteToken = {
            cpf: dadosParticipante.cpf,
            nome: dadosParticipante.nome
        };
        const token = await this._gerenciadorToken.gerarToken(dadosParticipanteToken);

        return {
            participante: dadosParticipanteToken,
            token: token
        };
    }
}

export { RealizarLoginParticipante };
