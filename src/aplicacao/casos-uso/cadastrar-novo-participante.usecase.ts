import { NovoParticipanteDTO } from "@/aplicacao/dto/participante.dto";
import { CifradorSegredos } from "@/aplicacao/providers/cifrador-segredos";
import { Participante } from "@/dominio/modelos/participante.model";
import { ParticipantesRepository } from "@/dominio/repositorios/participantes.repository";

type CadastrarNovoParticipanteParams = {
    cifradorSenha: CifradorSegredos;
    cifradorFraseSecreta: CifradorSegredos;
    repository: ParticipantesRepository;
};

class CadastrarNovoParticipante {

    private _cifradorSenha: CifradorSegredos;

    private _cifradorFraseSecreta: CifradorSegredos;

    private _repository: ParticipantesRepository;

    public constructor(params: CadastrarNovoParticipanteParams){
        this._cifradorSenha = params.cifradorSenha;
        this._cifradorFraseSecreta = params.cifradorFraseSecreta;
        this._repository = params.repository;
    }

    public async executar(input: NovoParticipanteDTO): Promise<void> {
        const fraseSecretaCifrada = await this._cifradorFraseSecreta.criptografar(input.frase_secreta_bruta);
        const senhaCifrada = await this._cifradorSenha.criptografar(input.senha_bruta);
        const novoParticipante = Participante.novo({
            nome: input.nome,
            cpf: input.cpf,
            email: input.email,
            telefone: input.telefone,
            senha: senhaCifrada,
            fraseSecreta: fraseSecretaCifrada
        });

        await this._repository.salvar(novoParticipante);
    }
}

export { CadastrarNovoParticipante };
