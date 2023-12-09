import { NovoOrganizadorDTO } from "@/aplicacao/dto/organizador.dto";
import { CifradorSegredos } from "@/aplicacao/providers/cifrador-segredos"
import { Organizador } from "@/dominio/modelos/organizador.model";
import { OrganizadoresRepository } from "@/dominio/repositorios/organizadores.repository";

type CadastrarNovoOrganizadorParams = {
    cifradorSenha: CifradorSegredos;
    cifradorFraseSecreta: CifradorSegredos;
    repository: OrganizadoresRepository;
};

class CadastrarNovoOrganizador {

    private _cifradorSenha: CifradorSegredos;

    private _cifradorFraseSecreta: CifradorSegredos;

    private _repository: OrganizadoresRepository;

    public constructor(params: CadastrarNovoOrganizadorParams){
        this._cifradorSenha = params.cifradorSenha;
        this._cifradorFraseSecreta = params.cifradorFraseSecreta;
        this._repository = params.repository;
    }

    public async executar(input: NovoOrganizadorDTO): Promise<void> {
        const fraseSecretaCifrada = await this._cifradorFraseSecreta.criptografar(input.frase_secreta_bruta);
        const senhaCifrada = await this._cifradorSenha.criptografar(input.senha_bruta);
        const novoOrganizador = Organizador.novo({
            nome: input.nome,
            cpfOUcnpj: input.cpf_cnpj,
            email: input.email,
            telefone: input.telefone,
            senha: senhaCifrada,
            fraseSecreta: fraseSecretaCifrada
        });

        await this._repository.salvar(novoOrganizador);
    }
}

export { CadastrarNovoOrganizador };
