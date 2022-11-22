import { RepositorioHistoriales } from "App/Dominio/Repositorios/RepositorioHistoriales";

export class ServicioHistorial {
    constructor(private repositorio: RepositorioHistoriales) {
    }

    guardarShopify(parametros: string) {
        return this.repositorio.guardarShopify(parametros)
    }

    guardarVtex(parametros: string) {
        return this.repositorio.guardarVtex(parametros)
    }



}