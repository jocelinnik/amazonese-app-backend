import { Request, Response } from "express";

import { BuscarEventosProximos } from "@/aplicacao/casos-uso/buscar-eventos-proximos.usecase";
import { Mensagem } from "@/aplicacao/dto/mensagem.dto";

type BuscarEventosProximosControllerParams = {
    useCase: BuscarEventosProximos;
};

class BuscarEventosProximosController {

    private _useCase: BuscarEventosProximos;

    public constructor(params: BuscarEventosProximosControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        try{
            const eventos = await this._useCase.executar();
            res.status(200).json(eventos);
        }catch(e: any){
            const erro = e as Error;
            const mensagem: Mensagem = {
                tipo: "erro",
                texto: "Tivemos um problema na hora de buscar os eventos. Tente novamente mais tarde"
            };
            
            console.error(erro);
            res.status(500).json(mensagem);
        }
    }
}

export { BuscarEventosProximosController };
