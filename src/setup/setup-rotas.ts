import { Router } from "express";

import { eventosRoutes } from "@/infraestrutura/http/rotas/eventos.route";
import { homeRoutes } from "@/infraestrutura/http/rotas/home.route";
import { organizadoresRoutes } from "@/infraestrutura/http/rotas/organizadores.route";
import { participantesRoutes } from "@/infraestrutura/http/rotas/participantes.route";

const configurarRotas = (): Router => {
    console.log("Iniciando a configuracao de rotas HTTP da aplicacao...");

    const routes = Router();

    routes.use("/", homeRoutes());
    routes.use("/eventos", eventosRoutes());
    routes.use("/organizadores", organizadoresRoutes());
    routes.use("/participantes", participantesRoutes());

    return routes;
};

export { configurarRotas };
