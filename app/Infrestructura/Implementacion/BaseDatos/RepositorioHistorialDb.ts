import { RepositorioHistoriales } from '../../../Dominio/Repositorios/RepositorioHistoriales';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

const uuidAPIKey = require('uuid-apikey');

export class RepositorioHistorialDb implements RepositorioHistoriales {


    async guardarShopify(datos: string): Promise<any> {


        //console.log(datos);


        const primeraConversion = JSON.parse(datos);
        const ventas = JSON.parse(primeraConversion)

        // const ventas =await JSON.parse(datos)

        if (ventas) {

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

    async guardarVentaShopify(ventas: any) {

        let correos;
        let marcacion;
        if (ventas.note) {

            correos = await JSON.parse(ventas.note).map(marca => {
                return marca.em
            })

            marcacion = ventas.note;

        }  else if(ventas.customer){

            const correosClientes = ventas.customer.email
            const cuenta = ventas.line_items[0].vendor
            
            const datosMarcacion = this.buscarMarcaionPorCorreo(correosClientes, cuenta)
            const datosRecibidos = await datosMarcacion.then(datos => {

                if (datos.data)
                    return datos.data

                return []
            })

            if (datosRecibidos.length > 0) {
                let ir = new Array();
                let em = new Array();

                datosRecibidos.forEach(datos => {
                    ir.push({"ir":datos.mar_id})
                    em.push(datos.mar_correo_cliente)
                });

                marcacion = JSON.stringify(ir)
                correos = em

            }         
        }

        if (marcacion) {
        const productos = ventas.line_items.map(producto => {
            return producto.name
        })

        const venta = {
            id: uuidAPIKey.create().uuid,
            ordenCompra: ventas.order_number,
            fechaOrden: ventas.updated_at,
            marcacion,
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


    async guardarVentasVtex(informacion: any) {
        let appToken = '';
        let appKey = '';


        //console.log("Antes de la consulta del token")

        appKey = informacion.Origin.Key
        const datosCuenta = {
            cuenta: informacion.Origin.Account,
            llave: appKey
        }
        /*  console.log(datosCuenta)
         console.log("======================================") */

        const token = await axios.post(Env.get('BACKEND') + `/ventas/filtro`, datosCuenta).then((resultado) => {
            return resultado
        }).catch((err) => {
            return err
        })

        //  console.log("Despues de la consulta del token")

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

            const url = `https://${informacion.Origin.Account}.myvtex.com/api/oms/pvt/orders`;

            const navegacion = await axios.get(`${url}/${orderId}`, configuracion).then((resultado) => {
                return resultado.data
            }).catch((err) => {
                return null
            })
            if (navegacion) {

                let correos: any;

                let marcacion: any;

                if (navegacion.customData) {

                    marcacion = navegacion.customData.customApps[0].fields.aliados;

                    if (marcacion) {
                        correos = await JSON.parse(marcacion).map(marca => {
                            return marca.em
                        })
                    }
                } else {
                    const correosClientes = navegacion.clientProfileData.email.split('-')
                    const datosMarcacion = this.buscarMarcaionPorCorreo(correosClientes[0], informacion.Origin.Account)

                    const datosRecibidos = await datosMarcacion.then(datos => {

                        if (datos.data)
                            return datos.data

                        return []
                    })


                    if (datosRecibidos.length > 0) {
                        let ir = new Array();
                        let em = new Array();

                        datosRecibidos.forEach(datos => {
                            ir.push({"ir":datos.mar_id})
                            em.push(datos.mar_correo_cliente)
                        });

                        marcacion = JSON.stringify(ir)
                        correos = em

                    }



                }

                if (marcacion) {

                    let valorTotal;
                    let flete;

                    valorTotal = navegacion.value / 100

                    await navegacion.totals.map(total => {
                        /* if (total.id == 'Items') {
                            valorTotal = total.value.toString();
                        } */
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
                        valorTotal: valorTotal.toString(),
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

    async buscarMarcaionPorCorreo(correo: string, cuenta: string) {
        const datosBusqueda = {
            cuenta,
            correo
        }
        return await axios.post(Env.get('BACKEND') + `/ventas/marcacion`, datosBusqueda).then((resultado) => {
            return resultado
        }).catch((err) => {
            return err
        })

    }

}