import { Router } from "express";

import { ContainerDI } from "@/infraestrutura/di/container-di";
import { CadastrarNovoParticipanteController } from "@/infraestrutura/http/controllers/cadastrar-novo-participante.controller";
import { RealizarLoginParticipanteController } from "@/infraestrutura/http/controllers/realizar-login-participante.controller";
import { RedefinirSenhaParticipanteController } from "@/infraestrutura/http/controllers/redefinir-senha-participante.controller";

const participantesRoutes = (): Router => {
    const routes = Router();
    const container = ContainerDI.pegarInstancia();
    const cadastrarNovoParticipante = container.get<CadastrarNovoParticipanteController>("CadastrarNovoParticipanteController");
    const realizarLoginParticipante = container.get<RealizarLoginParticipanteController>("RealizarLoginParticipanteController");
    const redefinirSenhaParticipante = container.get<RedefinirSenhaParticipanteController>("RedefinirSenhaParticipanteController");

    routes.post("/novo", cadastrarNovoParticipante.executar.bind(cadastrarNovoParticipante));
    routes.post("/login", realizarLoginParticipante.executar.bind(realizarLoginParticipante));
    routes.post("/redefinir-senha", redefinirSenhaParticipante.executar.bind(redefinirSenhaParticipante));

    return routes;
};

export { participantesRoutes };
