interface CifradorSenhas {

    criptografar(senhaBruta: string): Promise<string>;

    comparar(senhaBruta: string, senhaCifrada: string): Promise<boolean>;

}

export { CifradorSenhas };
