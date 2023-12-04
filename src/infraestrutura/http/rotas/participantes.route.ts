import { Router } from "express";

import { ContainerDI } from "@/infraestrutura/di/container-di";
import { CadastrarNovoParticipanteController } from "@/infraestrutura/http/controllers/cadastrar-novo-participante.controller";

const participantesRoutes = (): Router => {
    const routes = Router();
    const container = ContainerDI.pegarInstancia();
    const cadastrarNovoParticipante = container.get("CadastrarNovoParticipanteController") as CadastrarNovoParticipanteController;

    routes.post("/novo", cadastrarNovoParticipante.executar.bind(cadastrarNovoParticipante));

    return routes;
};

export { participantesRoutes };
