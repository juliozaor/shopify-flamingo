import { RepositorioHistoriales } from '../../../Dominio/Repositorios/RepositorioHistoriales';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

const uuidAPIKey = require('uuid-apikey');

export class RepositorioHistorialDb implements RepositorioHistoriales {


    async guardarShopify(datos: string): Promise<any> {

        const primeraConversion = JSON.parse(datos);
        const ventas = JSON.parse(primeraConversion)

        if (ventas.note) {
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

            return await axios.post(Env.get('BACKEND') + '/ventas/shopify', venta).then((resultado) => {
                return resultado.data
            }).catch((err) => {
                console.log(err)
                return err
            })

        }

    }

    async guardarVtex(datos: string): Promise<any> {

        const informacion= JSON.parse(datos);
        let appToken = 'TKWHNENHKDJWALUYZQVEWWJRWUAZYKYVTDZMKDUALUJOMITQAPOGAJJSVGBQAIYNXENLHVBPUWNDUVDGYVDIXCYFOOBREPAWDRNXNCONGMZGGDPDGNXPKTXKMSYGEXJL';
        const appKey = 'vtexappkey-flamingoqa-ATGJND';
        if( informacion.Origin ){
          //  TODO: Consultar el token


            if( appToken != ''){
                const orderId = informacion.OrderId;

                const configuracion = {
                    headers:{
                      'X-VTEX-API-AppKey':appKey,
                      'X-VTEX-API-AppToken':appToken
                    }
                  };

                const navegacion = await axios.get(Env.get('VTEX') + `/${orderId}`, configuracion).then((resultado) => {
                    return resultado.data
                }).catch((err) => {                    
                    return null
                })

                // Validar la informacion para sacar los datos
                if(navegacion){
                    const venta = {
                        id: uuidAPIKey.create().uuid,
                        ordenCompra: navegacion.orderId,
                        fechaOrden: navegacion.creationDate,
                        marcacion: navegacion.note,
                        valorTotal: navegacion.current_total_price,
                       // productos,
//flete: navegacion.shipping_lines[0].price,
                      //  correos
                    }
                    
                    return venta

                }
    
                

            }

           

        }
    
        
    }


}