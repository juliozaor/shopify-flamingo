
export interface RepositorioHistoriales{
    guardarShopify(parametros: string): Promise<any>
    guardarVtex(parametros: string): Promise<any>
}