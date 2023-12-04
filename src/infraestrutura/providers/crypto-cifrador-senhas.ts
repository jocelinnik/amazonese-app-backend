import { pbkdf2Sync } from "node:crypto";

import { CifradorSenhas } from "@/aplicacao/providers/cifrador-senhas";

type CryptoSHA512CifradorSenhasParams = {
    segredo: string;
    iteracoes: number;
};

class CryptoSHA512CifradorSenhas implements CifradorSenhas {

    private _segredo: string;

    private _iteracoes: number;

    public constructor(params: CryptoSHA512CifradorSenhasParams){
        this._segredo = params.segredo;
        this._iteracoes = params.iteracoes;
    }

    public async criptografar(senhaBruta: string): Promise<string> {
        return await this.executarAlgoritmo(senhaBruta);
    }

    public async comparar(senhaBruta: string, senhaCifrada: string): Promise<boolean> {
        const senhaParaComparar = await this.executarAlgoritmo(senhaBruta);

        return senhaParaComparar === senhaCifrada;
    }

    private async executarAlgoritmo(senha: string): Promise<string> {
        return pbkdf2Sync(senha, this._segredo, this._iteracoes, 64, "sha512").toString("hex");
    }
}

export { CryptoSHA512CifradorSenhas };
