import { NovoOrganizadorDTO } from "@/aplicacao/dto/organizador.dto";
import { CifradorSenhas } from "@/aplicacao/providers/cifrador-senhas"
import { Organizador } from "@/dominio/modelos/organizador.model";
import { OrganizadoresRepository } from "@/dominio/repositorios/organizadores.repository";

type CadastrarNovoOrganizadorParams = {
    cifrador: CifradorSenhas;
    repository: OrganizadoresRepository;
};

class CadastrarNovoOrganizador {

    private _cifrador: CifradorSenhas;

    private _repository: OrganizadoresRepository;

    public constructor(params: CadastrarNovoOrganizadorParams){
        this._cifrador = params.cifrador;
        this._repository = params.repository;
    }

    public async executar(input: NovoOrganizadorDTO): Promise<void> {
        const senhaCifrada = await this._cifrador.criptografar(input.senha_bruta);
        const novoOrganizador = Organizador.novo({
            nome: input.nome,
            cpfOUcnpj: input.cpf_cnpj,
            email: input.email,
            telefone: input.telefone,
            senha: senhaCifrada
        });

        await this._repository.salvar(novoOrganizador);
    }
}

export { CadastrarNovoOrganizador };
