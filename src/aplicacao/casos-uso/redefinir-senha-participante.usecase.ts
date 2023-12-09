import { RedefinirSenhaParticipanteDTO } from "@/aplicacao/dto/participante.dto";
import { CifradorSegredos } from "@/aplicacao/providers/cifrador-segredos";
import { ParticipantesRepository } from "@/dominio/repositorios/participantes.repository";

type RedefinirSenhaParticipanteParams = {
    cifradorSenha: CifradorSegredos;
    cifradorFraseSecreta: CifradorSegredos;
    repository: ParticipantesRepository;
};

class RedefinirSenhaParticipante {

    private _cifradorSenha: CifradorSegredos;

    private _cifradorFraseSecreta: CifradorSegredos;

    private _repository: ParticipantesRepository;

    public constructor(params: RedefinirSenhaParticipanteParams){
        this._cifradorSenha = params.cifradorSenha;
        this._cifradorFraseSecreta = params.cifradorFraseSecreta;
        this._repository = params.repository;
    }

    public async executar(input: RedefinirSenhaParticipanteDTO): Promise<void> {
        const dadosParticipante = await this._repository.buscarPorCpf(input.cpf);

        if(!await this._cifradorFraseSecreta.comparar(input.frase_secreta_bruta, dadosParticipante.fraseSecreta))
            throw new Error("A frase secreta fornecida está incorreta");

        const novaSenhaCifrada = await this._cifradorSenha.criptografar(input.nova_senha_bruta);
        dadosParticipante.senha = novaSenhaCifrada;

        await this._repository.salvar(dadosParticipante);
    }
}

export { RedefinirSenhaParticipante };
