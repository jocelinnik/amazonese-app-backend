import { Evento } from "@/dominio/modelos/evento.model";
import { Participante } from "@/dominio/modelos/participante.model";

interface ParticipantesRepository {

    buscarPorCpf(cpf: string): Promise<Participante>;

    salvar(participante: Participante): Promise<void>;

    favoritarEvento(evento: Evento, participante: Participante): Promise<void>;

}

export { ParticipantesRepository };
