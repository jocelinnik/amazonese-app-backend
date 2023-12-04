import { Evento } from "@/dominio/modelos/evento.model";
import { Organizador } from "@/dominio/modelos/organizador.model";

interface EventosRepository {

    buscarEventosPorOrganizador(organizador: Organizador): Promise<Evento[]>;

    salvar(evento: Evento): Promise<void>;

}

export { EventosRepository };
