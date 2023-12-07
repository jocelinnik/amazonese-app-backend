import { Router } from "express";

import { ContainerDI } from "@/infraestrutura/di/container-di";
import { BuscarEventosPorLocalidadeController } from "@/infraestrutura/http/controllers/buscar-eventos-por-localidade.controller";
import { BuscarEventosPorOrganizadorController } from "@/infraestrutura/http/controllers/buscar-eventos-por-organizador.controller";
import { CadastrarNovoEventoController } from "@/infraestrutura/http/controllers/cadastrar-novo-evento.controller";
import { FavoritarEventoController } from "@/infraestrutura/http/controllers/favoritar-evento.controller";
import { VerificadorTokenJWT } from "@/infraestrutura/http/middlewares/verificador-token-jwt.middleware";

const eventosRoutes = (): Router => {
    const routes = Router();
    const container = ContainerDI.pegarInstancia();
    const buscarEventosPorLocalidade = container.get("BuscarEventosPorLocalidadeController") as BuscarEventosPorLocalidadeController;
    const buscarEventosPorOrganizador = container.get("BuscarEventosPorOrganizadorController") as BuscarEventosPorOrganizadorController;
    const cadastrarNovoEvento = container.get("CadastrarNovoEventoController") as CadastrarNovoEventoController;
    const favoritarEvento = container.get("FavoritarEventoController") as FavoritarEventoController;
    const verificadorTokenJWT = container.get("VerificadorTokenJWT") as VerificadorTokenJWT;

    routes.get("/:cidade/:uf", buscarEventosPorLocalidade.executar.bind(buscarEventosPorLocalidade));
    routes.get("/:cpf_cnpj_organizador", [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], buscarEventosPorOrganizador.executar.bind(buscarEventosPorOrganizador));
    routes.post("/novo", [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], cadastrarNovoEvento.executar.bind(cadastrarNovoEvento));
    routes.post("/favoritar", [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], favoritarEvento.executar.bind(favoritarEvento));

    return routes;
};

export { eventosRoutes };
