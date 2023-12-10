import { Router } from "express";

import { ContainerDI } from "@/infraestrutura/di/container-di";
import { BuscarEventosPorLocalidadeController } from "@/infraestrutura/http/controllers/buscar-eventos-por-localidade.controller";
import { BuscarEventosPorOrganizadorController } from "@/infraestrutura/http/controllers/buscar-eventos-por-organizador.controller";
import { BuscarEventosProximosController } from "@/infraestrutura/http/controllers/buscar-eventos-proximos.controller";
import { CadastrarNovoEventoController } from "@/infraestrutura/http/controllers/cadastrar-novo-evento.controller";
import { FavoritarEventoController } from "@/infraestrutura/http/controllers/favoritar-evento.controller";
import { VerificadorTokenJWT } from "@/infraestrutura/http/middlewares/verificador-token-jwt.middleware";
import { BuscarEventosFavoritosParticipanteController } from "../controllers/buscar-eventos-favoritos-participante.controller";

const eventosRoutes = (): Router => {
    const routes = Router();
    const container = ContainerDI.pegarInstancia();
    const buscarEventosFavoritosParticipante = container.get<BuscarEventosFavoritosParticipanteController>("BuscarEventosFavoritosParticipanteController");
    const buscarEventosPorLocalidade = container.get<BuscarEventosPorLocalidadeController>("BuscarEventosPorLocalidadeController");
    const buscarEventosPorOrganizador = container.get<BuscarEventosPorOrganizadorController>("BuscarEventosPorOrganizadorController");
    const buscarEventosProximos = container.get<BuscarEventosProximosController>("BuscarEventosProximosController");
    const cadastrarNovoEvento = container.get<CadastrarNovoEventoController>("CadastrarNovoEventoController");
    const favoritarEvento = container.get<FavoritarEventoController>("FavoritarEventoController");
    const verificadorTokenJWT = container.get<VerificadorTokenJWT>("VerificadorTokenJWT");

    routes.get("/:cidade/:uf", buscarEventosPorLocalidade.executar.bind(buscarEventosPorLocalidade));
    routes.get("/proximos", buscarEventosProximos.executar.bind(buscarEventosProximos));
    routes.get("/:cpf_participante/favoritos", [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], buscarEventosFavoritosParticipante.executar.bind(buscarEventosFavoritosParticipante));
    routes.get("/:cpf_cnpj_organizador", [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], buscarEventosPorOrganizador.executar.bind(buscarEventosPorOrganizador));
    routes.post("/novo", [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], cadastrarNovoEvento.executar.bind(cadastrarNovoEvento));
    routes.post("/favoritar", [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], favoritarEvento.executar.bind(favoritarEvento));

    return routes;
};

export { eventosRoutes };
