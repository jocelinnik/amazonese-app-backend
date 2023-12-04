import { Participante } from "@/dominio/modelos/participante.model";

interface ParticipantesRepository {

    buscarPorCpf(cpf: string): Promise<Participante>;

    salvar(participante: Participante): Promise<void>;

}

export { ParticipantesRepository };
