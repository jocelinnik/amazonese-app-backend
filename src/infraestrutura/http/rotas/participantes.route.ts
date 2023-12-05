import { Router } from "express";

import { ContainerDI } from "@/infraestrutura/di/container-di";
import { CadastrarNovoParticipanteController } from "@/infraestrutura/http/controllers/cadastrar-novo-participante.controller";
import { RealizarLoginParticipanteController } from "@/infraestrutura/http/controllers/realizar-login-participante.controller";

const participantesRoutes = (): Router => {
    const routes = Router();
    const container = ContainerDI.pegarInstancia();
    const cadastrarNovoParticipante = container.get("CadastrarNovoParticipanteController") as CadastrarNovoParticipanteController;
    const realizarLoginParticipante = container.get("RealizarLoginParticipanteController") as RealizarLoginParticipanteController;

    routes.post("/novo", cadastrarNovoParticipante.executar.bind(cadastrarNovoParticipante));
    routes.post("/login", realizarLoginParticipante.executar.bind(realizarLoginParticipante));

    return routes;
};

export { participantesRoutes };
