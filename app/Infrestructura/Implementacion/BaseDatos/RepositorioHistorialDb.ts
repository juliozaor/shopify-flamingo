import { RepositorioHistoriales } from '../../../Dominio/Repositorios/RepositorioHistoriales';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

const uuidAPIKey = require('uuid-apikey');

export class RepositorioHistorialDb implements RepositorioHistoriales {


    async guardarShopify(datos: string): Promise<any> {

        const primeraConversion = JSON.parse(datos);
        const ventas = JSON.parse(primeraConversion)

        if (ventas.note) {
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

    }

    async guardarVtex(datos: string): Promise<any> {

        const informacion = JSON.parse(datos);
        let appToken = 'TKWHNENHKDJWALUYZQVEWWJRWUAZYKYVTDZMKDUALUJOMITQAPOGAJJSVGBQAIYNXENLHVBPUWNDUVDGYVDIXCYFOOBREPAWDRNXNCONGMZGGDPDGNXPKTXKMSYGEXJL';
        const appKey = 'vtexappkey-flamingoqa-ATGJND';
        if (informacion.Origin) {
            //  TODO: Consultar el token


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

                // return navegacion.customData.customApps[0].fields.aliados
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


}