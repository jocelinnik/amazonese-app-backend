import { Request, Response } from "express";

import { BuscarEventosPorOrganizador } from "@/aplicacao/casos-uso/buscar-eventos-por-organizador.usecase";

type BuscarEventosPorOrganizadorControllerParams = {
    useCase: BuscarEventosPorOrganizador;
};

class BuscarEventosPorOrganizadorController {

    private _useCase: BuscarEventosPorOrganizador;

    public constructor(params: BuscarEventosPorOrganizadorControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        const { cpf_cnpj_organizador } = req.params;
        const eventos = await this._useCase.executar(cpf_cnpj_organizador);

        res.status(200).json(eventos);
    }
}

export { BuscarEventosPorOrganizadorController };
