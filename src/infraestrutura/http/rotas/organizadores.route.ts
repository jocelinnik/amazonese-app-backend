import { Router } from "express";

import { ContainerDI } from "@/infraestrutura/di/container-di";
import { CadastrarNovoOrganizadorController } from "@/infraestrutura/http/controllers/cadastrar-novo-organizador.controller";
import { RealizarLoginOrganizadorController } from "@/infraestrutura/http/controllers/realizar-login-organizador.controller";
import { RedefinirSenhaOrganizadorController } from "@/infraestrutura/http/controllers/redefinir-senha-organizador.controller";

const organizadoresRoutes = (): Router => {
    const routes = Router();
    const container = ContainerDI.pegarInstancia();
    const cadastrarNovoOrganizador = container.get<CadastrarNovoOrganizadorController>("CadastrarNovoOrganizadorController");
    const realizarLoginOrganizador = container.get<RealizarLoginOrganizadorController>("RealizarLoginOrganizadorController");
    const redefinirSenhaOrganizador = container.get<RedefinirSenhaOrganizadorController>("RedefinirSenhaOrganizadorController");

    routes.post("/novo", cadastrarNovoOrganizador.executar.bind(cadastrarNovoOrganizador));
    routes.post("/login", realizarLoginOrganizador.executar.bind(realizarLoginOrganizador));
    routes.post("/redefinir-senha", redefinirSenhaOrganizador.executar.bind(redefinirSenhaOrganizador));

    return routes;
};

export { organizadoresRoutes };
