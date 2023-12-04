import cors from "cors";
import express from "express";

import { createServer, Server } from "node:http";

import { configurarDependencias } from "@/setup/setup-di";
import { configurarRotas } from "@/setup/setup-rotas";

const configurarServidor = (): Server => {
    configurarDependencias();
    const routes = configurarRotas();
    const app = express();
    const servidor = createServer(app);

    app.use(express.json());
    app.use(cors({
        origin: "*"
    }));
    app.use("/api", routes);

    return servidor;
};

export { configurarServidor };
