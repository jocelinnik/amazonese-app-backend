import { DadosEventoDTO } from "@/aplicacao/dto/evento.dto";
import { EventosRepository } from "@/dominio/repositorios/eventos.repository"
import { ParticipantesRepository } from "@/dominio/repositorios/participantes.repository";

type BuscarEventosFavoritosParticipanteParams = {
    eventosRepository: EventosRepository;
    participantesRepository: ParticipantesRepository;
};
type BuscarEventosFavoritosParticipanteInput = {
    cpf_participante: string;
};

class BuscarEventosFavoritosParticipante {

    private _eventosRepository: EventosRepository;

    private _participantesRepository: ParticipantesRepository;

    public constructor(params: BuscarEventosFavoritosParticipanteParams){
        this._eventosRepository = params.eventosRepository;
        this._participantesRepository = params.participantesRepository;
    }

    public async executar(input: BuscarEventosFavoritosParticipanteInput): Promise<DadosEventoDTO[]> {
        const participante = await this._participantesRepository.buscarPorCpf(input.cpf_participante);
        const eventos = await this._eventosRepository.buscarEventosFavoritosParticipante(participante);

        return (
            eventos
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

export { BuscarEventosFavoritosParticipante };
