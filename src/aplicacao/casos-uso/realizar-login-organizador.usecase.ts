import { LoginOrganizadorDTO, OrganizadorLogadoDTO } from "@/aplicacao/dto/organizador.dto";
import { CifradorSenhas } from "@/aplicacao/providers/cifrador-senhas";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/providers/gerenciador-tokens-autenticacao";
import { OrganizadoresRepository } from "@/dominio/repositorios/organizadores.repository";

type RealizarLoginOrganizadorParams = {
    repository: OrganizadoresRepository;
    cifrador: CifradorSenhas;
    gerenciadorToken: GerenciadorTokenAutenticacao;
};

class RealizarLoginOrganizador {

    private _repository: OrganizadoresRepository;

    private _cifrador: CifradorSenhas;

    private _gerenciadorToken: GerenciadorTokenAutenticacao;

    public constructor(params: RealizarLoginOrganizadorParams){
        this._repository = params.repository;
        this._cifrador = params.cifrador;
        this._gerenciadorToken = params.gerenciadorToken;
    }

    public async executar(dadosLogin: LoginOrganizadorDTO): Promise<OrganizadorLogadoDTO> {
        const dadosOrganizador = await this._repository.buscarPorCpfCnpj(dadosLogin.cpf_cnpj);

        if(!await this._cifrador.comparar(dadosLogin.senha_bruta, dadosOrganizador.senha))
            throw new Error("A senha de acesso está incorreta");

        const dadosOrganizadorToken = {
            cpf_cnpj: dadosOrganizador.cpfOUcnpj,
            nome: dadosOrganizador.nome
        };
        const token = await this._gerenciadorToken.gerarToken(dadosOrganizadorToken);

        return {
            organizador: dadosOrganizadorToken,
            token: token
        };
    }
}

export { RealizarLoginOrganizador };
