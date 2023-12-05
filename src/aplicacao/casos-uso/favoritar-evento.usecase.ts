import { EventoParaFavoritarDTO } from "@/aplicacao/dto/evento.dto";
import { EventosRepository } from "@/dominio/repositorios/eventos.repository";
import { ParticipantesRepository } from "@/dominio/repositorios/participantes.repository";

type FavoritarEventoParams = {
    eventosRepository: EventosRepository;
    participantesRepository: ParticipantesRepository;
};

class FavoritarEvento {

    private _eventosRepository: EventosRepository;

    private _participantesRepository: ParticipantesRepository;

    public constructor(params: FavoritarEventoParams){
        this._eventosRepository = params.eventosRepository;
        this._participantesRepository = params.participantesRepository;
    }

    public async executar(input: EventoParaFavoritarDTO): Promise<void> {
        const evento = await this._eventosRepository.buscarPorId(input.id_evento);
        const participante = await this._participantesRepository.buscarPorCpf(input.cpf_participante);

        await this._participantesRepository.favoritarEvento(evento, participante);
    }
}

export { FavoritarEvento };
