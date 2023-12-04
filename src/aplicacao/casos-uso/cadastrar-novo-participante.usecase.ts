import { NovoParticipanteDTO } from "@/aplicacao/dto/participante.dto";
import { CifradorSenhas } from "@/aplicacao/providers/cifrador-senhas";
import { Participante } from "@/dominio/modelos/participante.model";
import { ParticipantesRepository } from "@/dominio/repositorios/participantes.repository";

type CadastrarNovoParticipanteParams = {
    cifrador: CifradorSenhas;
    repository: ParticipantesRepository;
};

class CadastrarNovoParticipante {

    private _cifrador: CifradorSenhas;

    private _repository: ParticipantesRepository;

    public constructor(params: CadastrarNovoParticipanteParams){
        this._cifrador = params.cifrador;
        this._repository = params.repository;
    }

    public async executar(input: NovoParticipanteDTO): Promise<void> {
        const senhaCifrada = await this._cifrador.criptografar(input.senha_bruta);
        const novoParticipante = Participante.novo({
            nome: input.nome,
            cpf: input.cpf,
            email: input.email,
            telefone: input.telefone,
            senha: senhaCifrada
        });

        await this._repository.salvar(novoParticipante);
    }
}

export { CadastrarNovoParticipante };
