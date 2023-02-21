import { RepositorioHistoriales } from '../../../Dominio/Repositorios/RepositorioHistoriales';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

const uuidAPIKey = require('uuid-apikey');

export class RepositorioHistorialDb implements RepositorioHistoriales {


    async guardarShopify(datos: string): Promise<any> {

        const primeraConversion = JSON.parse(datos);
        const ventas = JSON.parse(primeraConversion)

        // const ventas =await JSON.parse(datos)

        if (ventas) {

            this.guardarVentaShopify(ventas);

            return true

        }

        return false

    }


    async guardarVentaShopify(ventas: any) {

        let correos;
        let marcacion;

        if (ventas.note) {

            correos = ventas.email;
            marcacion = JSON.parse(ventas.note);



        } else if (ventas.customer) {

            const correosClientes = ventas.email
            // const cuenta = ventas.line_items[0].vendor
            const cuenta = ventas.app_id

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
                    ir.push({ "ir": datos.mar_id })
                    em.push(datos.mar_correo_cliente)
                });

                marcacion = JSON.stringify(ir)
                correos = em

            }
        }

        if (marcacion) {
            const productos = ventas.line_items.map(producto => {
                return `ref: ${producto.sku} - cant: ${producto.quantity} - nombre: ${producto.name} - valor : $${producto.price}`
            })



            const venta = {
                id: uuidAPIKey.create().uuid,
                ordenCompra: ventas.order_number,
                fechaOrden: ventas.updated_at,
                marcacion,
                valorTotal: ventas.current_total_price,
                productos,
                flete: ventas.shipping_lines[0].price,
                correos,
                nombreCliente: ventas.billing_address.first_name,
                apellidoCliente: ventas.billing_address.last_name,
                documentoCliente: ventas.billing_address.company,
                medioPago: ventas.payment_gateway_names[0]
            }


            return await axios.post(Env.get('BACKEND') + '/ventas/shopify', venta).then((resultado) => {
                console.log(resultado);
                return resultado.data
            }).catch((err) => {
                console.log(err)
                return err
            })

        }


    }


    async guardarVtex(datos: string): Promise<any> {

        const informacion = JSON.parse(datos);

        if (informacion.Origin) {
            this.guardarVentasVtex(informacion);

            return true

        }

        return false
    }

    async guardarVentasVtex(informacion: any) {
        console.log('vtex 1');

        let appToken = '';
        let orderId = informacion.OrderId;
        let appKey = informacion.Origin.Key;
        let cuentaInformacion = informacion.Origin.Account;

        const orden = informacion.OrderId.split('-');

        const datosPrefijo = {
            prefijo: orden[0]
        }

        const prefijo = await axios.post(Env.get('BACKEND') + `/ventas/prefijo`, datosPrefijo).then((resultado) => {

            if (resultado.data)
                return resultado.data

            return []
        }).catch((err) => {
            console.log(err);

            return []
        })


        if (prefijo.length > 0) {
            console.log('entro al prefijo');

            appKey = prefijo[0].fil_llave;
            appToken = prefijo[0].fil_token;
            orderId = orderId.slice(4);
            cuentaInformacion = prefijo[0].fil_cuenta;
        } else {
            const datosCuenta = {
                cuenta: cuentaInformacion,
                llave: appKey
            }

            const token = await axios.post(Env.get('BACKEND') + `/ventas/filtro`, datosCuenta).then((resultado) => {
                return resultado
            }).catch((err) => {
                console.log(err);
                
                return err
            })

            if (token.status == 200) {
                appToken = token.data
            }
        }


        if (appToken != '') {

            const configuracion = {
                headers: {
                    'X-VTEX-API-AppKey': appKey,
                    'X-VTEX-API-AppToken': appToken
                }
            };
            const url = `https://${cuentaInformacion}.myvtex.com/api/oms/pvt/orders`;

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
                    const correosClientes = navegacion.clientProfileData.email.split('-')

                    correos = `["${correosClientes[0]}"]`
                } else {

                    console.log('entro por correo');
                    const correosClientes = navegacion.clientProfileData.email.split('-')
                    const datosMarcacion = this.buscarMarcaionPorCorreo(correosClientes[0], cuentaInformacion)

                    const datosRecibidos = await datosMarcacion.then(datos => {

                        if (datos.data)
                            return datos.data

                        return []
                    })


                    if (datosRecibidos.length > 0) {
                        let ir = new Array();
                        let em = new Array();

                        datosRecibidos.forEach(datos => {
                            ir.push({ "ir": datos.mar_id })
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
                        if (total.id == 'Shipping') {
                            flete = total.value / 100;
                        }
                    })
                    const productos = await navegacion.items.map(item => {
                        return `ref: ${item.refId} - cant: ${item.quantity} - nombre: ${item.name} - valor : $${item.price / 100}`
                    })

                    const metodoPago = navegacion.paymentData.transactions[0].payments[0].paymentSystemName


                    const venta = {
                        id: uuidAPIKey.create().uuid,
                        ordenCompra: navegacion.orderId,
                        fechaOrden: navegacion.creationDate,
                        marcacion,
                        valorTotal: valorTotal.toString(),
                        productos,
                        flete: flete.toString(),
                        correos,
                        nombreCliente: navegacion.clientProfileData.firstName,
                        apellidoCliente: navegacion.clientProfileData.lastName,
                        documentoCliente: navegacion.clientProfileData.document,
                        medioPago: metodoPago
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