import { NovoEventoDTO } from "@/aplicacao/dto/evento.dto";
import { Evento } from "@/dominio/modelos/evento.model";
import { EventosRepository } from "@/dominio/repositorios/eventos.repository";
import { OrganizadoresRepository } from "@/dominio/repositorios/organizadores.repository";

type CadastrarNovoEventoParams = {
    eventosRepository: EventosRepository;
    organizadoresRepository: OrganizadoresRepository;
};

class CadastrarNovoEvento {

    private _eventosRepository: EventosRepository;

    private _organizadoresRepository: OrganizadoresRepository;

    public constructor(params: CadastrarNovoEventoParams){
        this._eventosRepository = params.eventosRepository;
        this._organizadoresRepository = params.organizadoresRepository;
    }

    public async executar(input: NovoEventoDTO): Promise<void> {
        const organizador = (
            await this._organizadoresRepository
                .buscarPorCpfCnpj(input.cpf_cnpj_organizador)
        );
        const novoEvento = Evento.novo({
            nome: input.nome,
            descricao: input.descricao,
            preco: input.preco,
            localidade: input.localidade,
            categorias: input.categorias,
            dataInicio: input.data_inicio,
            dataFim: input.data_fim,
            organizador: organizador
        });
        await this._eventosRepository.salvar(novoEvento);
    }
}

export { CadastrarNovoEvento };
