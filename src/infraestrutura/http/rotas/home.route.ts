import { Request, Response, Router } from "express";

const homeRoutes = (): Router => {
    const routes = Router();

    routes.get("/", async (req: Request, res: Response): Promise<void> => {
        res.json({
            nome_app: "amazonese-app-backend",
            data_versao: "2023-12-04",
            id_versao: "0.0.1-dev"
        });
    });

    return routes;
};

export { homeRoutes };
