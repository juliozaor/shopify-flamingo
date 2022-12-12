import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ServicioHistorial } from "App/Dominio/Datos/Servicios/ServicioHistorial";
import { RepositorioHistorialDb } from '../../Infrestructura/Implementacion/BaseDatos/RepositorioHistorialDb';
import axios from 'axios';
import { extname } from 'path'
import Drive from '@ioc:Adonis/Core/Drive'

export default class ControladorCategorias {
    private servicio: ServicioHistorial;

    constructor() {
        this.servicio = new ServicioHistorial(new RepositorioHistorialDb())
    }



    public async guardarShopify({ request }: HttpContextContract) {

        const informacion = request.raw();

         if (informacion){
            await axios.post(`https://tysa.co/flamingo/marcacion/recibirvtex.php`, informacion).then((resultado) => {
                console.log("Guardo el log shopify");
                
            }).catch((err) => {
                console.log(err)
            })
        }  
        const formateoUno = informacion?.replace('note":""', 'note":"')
        const formateoDos = formateoUno?.replace(']"', ']')


        return await this.servicio.guardarShopify(JSON.stringify(formateoDos))

    }

    public async guardarVtex({ request }) {

        const datos = request.all();

        if (datos){            
            await axios.post(`https://tysa.co/flamingo/marcacion/recibirvtex.php`, datos).then((resultado) => {
                console.log("Guardo el log vtex");
                
            }).catch((err) => {
                console.log(err)
            })
        }
        return await this.servicio.guardarVtex(JSON.stringify(datos))

    }


    public async mostrarArchivo({ request, response }: HttpContextContract) {
        const ubicacion = request.param('*').join('/')
        try {
            const { size } = await Drive.getStats(ubicacion)
            response.type(extname(ubicacion))
            response.header('content-length', size)

            return response.stream(await Drive.getStream(ubicacion))
        } catch (error) {
            response.status(400).send("Archivo no encontrado")
        }

    }






}