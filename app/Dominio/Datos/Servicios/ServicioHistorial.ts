import { RepositorioHistoriales } from "App/Dominio/Repositorios/RepositorioHistoriales";

export class ServicioHistorial {
    constructor(private repositorio: RepositorioHistoriales) {
    }

    historial(parametros: string) {
        return this.repositorio.historial(parametros)
    }


}