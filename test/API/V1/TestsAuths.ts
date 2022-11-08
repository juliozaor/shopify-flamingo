import axios, { AxiosResponse } from "axios";
import Env from "@ioc:Adonis/Core/Env";


export async function obtenerTokenAutorizacion():Promise<string>{
    let endpoint = "/api/v1/token/generar"
    let body = {
        usuario: "c3VwZXJhcHAyMDIx",
        contrasena: "Y2xhdmVzZWNyZXRh"
    }
    let axiosResponse:AxiosResponse<any> = await axios.post(`${Env.get("URL_ADMINYLOG") + endpoint}`, body)
    return axiosResponse.data.token
}
