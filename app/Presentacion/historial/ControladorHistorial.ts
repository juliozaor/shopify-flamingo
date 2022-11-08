import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ServicioHistorial } from "App/Dominio/Datos/Servicios/ServicioHistorial";
import { RepositorioHistorialDb } from '../../Infrestructura/Implementacion/BaseDatos/RepositorioHistorialDb';

export default class ControladorCategorias {
private servicio: ServicioHistorial;

    constructor() {
        this.servicio = new ServicioHistorial(new RepositorioHistorialDb())
    }
    
   

    public async guardar({ request }: HttpContextContract) {
        const informacion = request.raw();
      const formateoUno = informacion?.replace('note":""', 'note":"')
      const formateoDos = formateoUno?.replace(']"","note', ']","note')

            return await this.servicio.historial(JSON.stringify(formateoDos))
      
    }



}