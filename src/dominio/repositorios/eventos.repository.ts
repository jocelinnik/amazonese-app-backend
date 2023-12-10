import { Evento } from "@/dominio/modelos/evento.model";
import { Organizador } from "@/dominio/modelos/organizador.model";
import { Participante } from "@/dominio/modelos/participante.model";

interface EventosRepository {

    buscarEventosFavoritosParticipante(participante: Participante): Promise<Evento[]>;

    buscarEventoPorId(id: string): Promise<Evento>;
    
    buscarEventosPorOrganizador(organizador: Organizador): Promise<Evento[]>;

    buscarEventosPorLocalidade(cidade: string, uf: string): Promise<Evento[]>;

    buscarEventosProximos(): Promise<Evento[]>;

    salvar(evento: Evento): Promise<void>;

}

export { EventosRepository };
