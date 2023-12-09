import { PrismaClient } from "@prisma/client";

import { Organizador } from "@/dominio/modelos/organizador.model";
import { OrganizadoresRepository } from "@/dominio/repositorios/organizadores.repository";

class PrismaOrganizadoresRepository implements OrganizadoresRepository {

    private _conexao: PrismaClient;

    public constructor(){
        this._conexao = new PrismaClient({
            log: ["info", "query"]
        });
    }

    public async buscarPorCpfCnpj(cpfOUcnpj: string): Promise<Organizador> {
        const dadosOrganizador = await this._conexao.organizador.findFirst({
            where: {
                cpfOUCnpj: cpfOUcnpj
            }
        });

        if(!dadosOrganizador)
            throw new Error(`O organizador com CPF/CNPJ ${cpfOUcnpj} não foi encontrado`);

        return Organizador.recuperar({
            id: dadosOrganizador.id,
            nome: dadosOrganizador.nome,
            cpfOUcnpj: dadosOrganizador.cpfOUCnpj,
            email: dadosOrganizador.email,
            telefone: dadosOrganizador.telefone,
            senha: dadosOrganizador.senha,
            fraseSecreta: dadosOrganizador.fraseSecreta
        });
    }

    public async salvar(organizador: Organizador): Promise<void> {
        if(organizador.id)
            await this.atualizarOrganizador(organizador);
        else
            await this.inserirOrganizador(organizador);
    }

    private async inserirOrganizador(organizador: Organizador): Promise<void> {
        await this._conexao.organizador.create({
            data: {
                nome: organizador.nome,
                cpfOUCnpj: organizador.cpfOUcnpj,
                email: organizador.email,
                telefone: organizador.telefone,
                senha: organizador.senha,
                fraseSecreta: organizador.fraseSecreta
            }
        });
    }

    private async atualizarOrganizador(organizador: Organizador): Promise<void> {
        await this._conexao.organizador.update({
            data: {
                nome: organizador.nome,
                cpfOUCnpj: organizador.cpfOUcnpj,
                email: organizador.email,
                telefone: organizador.telefone,
                senha: organizador.senha,
                fraseSecreta: organizador.fraseSecreta
            },
            where: {
                id: organizador.id
            }
        });
    }
}

export { PrismaOrganizadoresRepository };
