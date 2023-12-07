import { Evento } from "@/dominio/modelos/evento.model";
import { Organizador } from "@/dominio/modelos/organizador.model";

interface EventosRepository {

    buscarEventoPorId(id: string): Promise<Evento>;
    
    buscarEventosPorOrganizador(organizador: Organizador): Promise<Evento[]>;

    buscarEventosPorLocalidade(cidade: string, uf: string): Promise<Evento[]>;

    salvar(evento: Evento): Promise<void>;

}

export { EventosRepository };
