import { RepositorioHistoriales } from '../../../Dominio/Repositorios/RepositorioHistoriales';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

const uuidAPIKey = require('uuid-apikey');

export class RepositorioHistorialDb implements RepositorioHistoriales {


    async guardarShopify(datos: string): Promise<any> {

        const primeraConversion = JSON.parse(datos);
        const ventas = JSON.parse(primeraConversion)

        if (ventas.note) {

            this.guardarVentaShopify(ventas);

            return true

        }

        return false

    }

    async guardarVtex(datos: string): Promise<any> {

        const informacion = JSON.parse(datos);
        
        if (informacion.Origin) {
            this.guardarVentasVtex(informacion);

            return true

        }

        return false


    }

    async  guardarVentaShopify(ventas:any){

        const productos = ventas.line_items.map(producto => {
            return producto.name
        })

        let correos = await JSON.parse(ventas.note).map(marca => {
            return marca.em
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


    async  guardarVentasVtex(informacion:any){
        let appToken = '';
        let appKey = '';
        appKey = informacion.Origin.Key
        const datosCuenta = {
            cuenta: informacion.Origin.Account,
            llave: appKey
        }

        const token = await axios.post(Env.get('BACKEND') + `/ventas/filtro`, datosCuenta).then((resultado) => {
            return resultado
        }).catch((err) => {
            return err
        })

        if (token.status == 200) {
            appToken = token.data               
        }

        if (appToken != '') {
            const orderId = informacion.OrderId;

            const configuracion = {
                headers: {
                    'X-VTEX-API-AppKey': appKey,
                    'X-VTEX-API-AppToken': appToken
                }
            };


            const navegacion = await axios.get(Env.get('VTEX') + `/${orderId}`, configuracion).then((resultado) => {
                return resultado.data
            }).catch((err) => {
                return null
            })

            // Validar la informacion para sacar los datos
            if (navegacion && navegacion.customData) {
                const marcacion = navegacion.customData.customApps[0].fields.aliados;
                let valorTotal;
                let flete;
                let correos = await JSON.parse(marcacion).map(marca => {
                    return marca.em
                })
                await navegacion.totals.map(total => {
                    if (total.id == 'Items') {
                        valorTotal = total.value.toString();
                    }
                    if (total.id == 'Shipping') {
                        flete = total.value.toString();
                    }
                })
                const productos = await navegacion.items.map(item => {
                    return item.name
                })


                const venta = {
                    id: uuidAPIKey.create().uuid,
                    ordenCompra: navegacion.orderId,
                    fechaOrden: navegacion.creationDate,
                    marcacion,
                    valorTotal,
                    productos,
                    flete,
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

    }

}