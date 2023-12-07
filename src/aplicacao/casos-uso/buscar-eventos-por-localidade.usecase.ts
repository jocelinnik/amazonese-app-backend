import { DadosEventoDTO, LocalidadeEventoDTO } from "@/aplicacao/dto/evento.dto";
import { EventosRepository } from "@/dominio/repositorios/eventos.repository";

type BuscarEventosPorLocalidadeParams = {
    repository: EventosRepository;
};

class BuscarEventosPorLocalidade {

    private _repository: EventosRepository;

    public constructor(params: BuscarEventosPorLocalidadeParams){
        this._repository = params.repository;
    }

    public async executar(input: LocalidadeEventoDTO): Promise<DadosEventoDTO[]> {
        const dadosEventos = await this._repository.buscarEventosPorLocalidade(input.cidade, input.uf);

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

export { BuscarEventosPorLocalidade };
