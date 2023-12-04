import { Router } from "express";

import { ContainerDI } from "@/infraestrutura/di/container-di";
import { CadastrarNovoOrganizadorController } from "@/infraestrutura/http/controllers/cadastrar-novo-organizador.controller";
import { RealizarLoginOrganizadorController } from "@/infraestrutura/http/controllers/realizar-login-organizador.controller";

const organizadoresRoutes = (): Router => {
    const routes = Router();
    const container = ContainerDI.pegarInstancia();
    const cadastrarNovoOrganizador = container.get("CadastrarNovoOrganizadorController") as CadastrarNovoOrganizadorController;
    const realizarLoginOrganizador = container.get("RealizarLoginOrganizadorController") as RealizarLoginOrganizadorController;

    routes.post("/novo", cadastrarNovoOrganizador.executar.bind(cadastrarNovoOrganizador));
    routes.post("/login", realizarLoginOrganizador.executar.bind(realizarLoginOrganizador));

    return routes;
};

export { organizadoresRoutes };
