import { Respuesta } from 'App/Infrestructura/datos/respuestas/Respuesta';

import { RepositorioHistoriales } from '../../../Dominio/Repositorios/RepositorioHistoriales';
import { TblhistorialesShopify } from '../../datos/entidades/Historial';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

const uuidAPIKey = require('uuid-apikey');

export class RepositorioHistorialDb implements RepositorioHistoriales {


    async historial(datos: string): Promise<any> {

        const primeraConversion = JSON.parse(datos);
        const ventas = JSON.parse(primeraConversion)
        const notas = JSON.parse(ventas.note);
        let correos = new Array();

        // si note es vacia o null nmo se manda nada

        const productos = ventas.line_items.map(producto => {
            return producto.name
        })

        notas.map(nota => {
            correos.push(nota.em)
        })

        const venta = {
            id: uuidAPIKey.create().uuid,
            ordenCompra: ventas.order_number,
            fechaOrden: ventas.updated_at,
            marcacion: ventas.note,
            valorTotal: ventas.current_total_price,
            productos,
            flete: ventas.shipping_lines[0].price,
            correos
        }

       return await axios.post(Env.get('BACKEND')+'/ventas/shopify', venta).then((resultado) => {
            return  resultado.data
        }).catch((err)=>{
            console.log(err)
           return err
        })


    }


}