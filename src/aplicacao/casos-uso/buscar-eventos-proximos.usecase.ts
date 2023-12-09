import { DadosEventoDTO } from "@/aplicacao/dto/evento.dto";
import { EventosRepository } from "@/dominio/repositorios/eventos.repository";

type BuscarEventosProximosParams = {
    repository: EventosRepository;
};

class BuscarEventosProximos {

    private _repository: EventosRepository;

    public constructor(params: BuscarEventosProximosParams){
        this._repository = params.repository;
    }

    public async executar(): Promise<DadosEventoDTO[]> {
        const dadosEventos = await this._repository.buscarEventosProximos();

        return (
            dadosEventos
                .map(evento => ({
                    id: evento.id,
                    nome: evento.nome,
                    categorias: evento.categorias,
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

export { BuscarEventosProximos };
