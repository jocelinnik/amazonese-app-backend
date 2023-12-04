import { DadosEventoDTO } from "@/aplicacao/dto/evento.dto";
import { EventosRepository } from "@/dominio/repositorios/eventos.repository";
import { OrganizadoresRepository } from "@/dominio/repositorios/organizadores.repository";

type BuscarEventosPorOrganizadorParams = {
    eventosRepository: EventosRepository;
    organizadoresRepository: OrganizadoresRepository;
};

class BuscarEventosPorOrganizador {

    private _eventosRepository: EventosRepository;

    private _organizadoresRepository: OrganizadoresRepository;

    public constructor(params: BuscarEventosPorOrganizadorParams){
        this._eventosRepository = params.eventosRepository;
        this._organizadoresRepository = params.organizadoresRepository;
    }

    public async executar(input: string): Promise<DadosEventoDTO[]> {
        const organizador = await this._organizadoresRepository.buscarPorCpfCnpj(input);
        const dadosEventos = await this._eventosRepository.buscarEventosPorOrganizador(organizador);

        return (
            dadosEventos
                .map(evento => ({
                    nome: evento.nome,
                    descricao: evento.descricao,
                    preco: evento.preco,
                    data_inicio: evento.dataInicio,
                    data_fim: evento.dataFim,
                    localidade: {
                        cidade: evento.localidade.cidade,
                        uf: evento.localidade.uf
                    }
                }))
        );
    }

}

export { BuscarEventosPorOrganizador };
