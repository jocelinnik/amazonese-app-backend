import { LoginParticipanteDTO, ParticipanteLogadoDTO } from "@/aplicacao/dto/participante.dto";
import { CifradorSenhas } from "@/aplicacao/providers/cifrador-senhas"
import { GerenciadorTokenAutenticacao } from "@/aplicacao/providers/gerenciador-tokens-autenticacao";
import { ParticipantesRepository } from "@/dominio/repositorios/participantes.repository";

type RealizarLoginParticipanteParams = {
    cifrador: CifradorSenhas;
    gerenciadorToken: GerenciadorTokenAutenticacao;
    repository: ParticipantesRepository;
};

class RealizarLoginParticipante {

    private _cifrador: CifradorSenhas;

    private _gerenciadorToken: GerenciadorTokenAutenticacao;

    private _repository: ParticipantesRepository;

    public constructor(params: RealizarLoginParticipanteParams){
        this._cifrador = params.cifrador;
        this._gerenciadorToken = params.gerenciadorToken;
        this._repository = params.repository;
    }

    public async executar(input: LoginParticipanteDTO): Promise<ParticipanteLogadoDTO> {
        const dadosParticipante = await this._repository.buscarPorCpf(input.cpf);

        if(!await this._cifrador.comparar(input.senha_bruta, dadosParticipante.senha))
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
