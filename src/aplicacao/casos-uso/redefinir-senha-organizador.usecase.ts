import { RedefinirSenhaOrganizadorDTO } from "@/aplicacao/dto/organizador.dto";
import { CifradorSegredos } from "@/aplicacao/providers/cifrador-segredos";
import { OrganizadoresRepository } from "@/dominio/repositorios/organizadores.repository";

type RedefinirSenhaOrganizadorParams = {
    cifradorSenha: CifradorSegredos;
    cifradorFraseSecreta: CifradorSegredos;
    repository: OrganizadoresRepository;
};

class RedefinirSenhaOrganizador {

    private _cifradorSenha: CifradorSegredos;

    private _cifradorFraseSecreta: CifradorSegredos;

    private _repository: OrganizadoresRepository;

    public constructor(params: RedefinirSenhaOrganizadorParams){
        this._cifradorSenha = params.cifradorSenha;
        this._cifradorFraseSecreta = params.cifradorFraseSecreta;
        this._repository = params.repository;
    }

    public async executar(input: RedefinirSenhaOrganizadorDTO): Promise<void> {
        const dadosOrganizador = await this._repository.buscarPorCpfCnpj(input.cpf_cnpj);

        if(!await this._cifradorFraseSecreta.comparar(input.frase_secreta_bruta, dadosOrganizador.fraseSecreta))
            throw new Error("A frase secreta fornecida está incorreta");

        const novaSenhaCifrada = await this._cifradorSenha.criptografar(input.nova_senha_bruta);
        dadosOrganizador.senha = novaSenhaCifrada;

        await this._repository.salvar(dadosOrganizador);
    }
}

export { RedefinirSenhaOrganizador };
