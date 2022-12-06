import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ServicioHistorial } from "App/Dominio/Datos/Servicios/ServicioHistorial";
import { RepositorioHistorialDb } from '../../Infrestructura/Implementacion/BaseDatos/RepositorioHistorialDb';
import axios from 'axios';

export default class ControladorCategorias {
    private servicio: ServicioHistorial;

    constructor() {
        this.servicio = new ServicioHistorial(new RepositorioHistorialDb())
    }



    public async guardarShopify({ request }: HttpContextContract) {
        console.log("entro a la ruta de dhopify")

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

       // console.log("entro a la ruta de vtex")

        const datos = request.all();

        if (datos){            
            await axios.post(`https://tysa.co/flamingo/marcacion/recibirvtex.php`, datos).then((resultado) => {
                console.log("Guardo el log vtex");
                
            }).catch((err) => {
                console.log(err)
            })
        }
       /*  console.log(datos)
        console.log("===================================") */
        return await this.servicio.guardarVtex(JSON.stringify(datos))

    }






}