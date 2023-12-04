import { Organizador } from "@/dominio/modelos/organizador.model";

interface OrganizadoresRepository {

    buscarPorCpfCnpj(cpfOUcnpj: string): Promise<Organizador>;

    salvar(organizador: Organizador): Promise<void>;

}

export { OrganizadoresRepository };
