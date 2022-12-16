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


    async guardarVentaShopify(ventas: any) {

        let correos;
        let marcacion;

        if (ventas.note) {

            console.log('entro 1')
           /* const correoFormateado = JSON.parse(ventas.note)
            correos = await correoFormateado.map(marca => {
                return marca.em
            }) */
            correos = ventas.email;
            marcacion = JSON.parse(ventas.note);

            console.log({
                correos, marcacion
            });
            

        }  else if(ventas.customer){

            console.log('Entro 2');
            

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
                    ir.push({"ir":datos.mar_id})
                    em.push(datos.mar_correo_cliente)
                });

                marcacion = JSON.stringify(ir)
                correos = em

            }         
        }

        if (marcacion) {

            console.log('entro 4');
            
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

        console.log(venta);


        

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

        const prefijo =  await axios.post(Env.get('BACKEND') + `/ventas/prefijo`, datosPrefijo).then((resultado) => {
            
            if (resultado.data)
            return resultado.data

        return []
        }).catch((err) => {
            console.log(err);
            
            return []
        })

        console.log({prefijo: prefijo.data});
        

        if(prefijo.length > 0){
            console.log('entro al prefijo');
            
            appKey = prefijo[0].fil_llave;
            appToken = prefijo[0].fil_token;
            orderId = orderId.slice(4);
            cuentaInformacion = prefijo[0].fil_cuenta;
        }else{
            const datosCuenta = {
                cuenta: cuentaInformacion,
                llave: appKey
            }

            console.log(datosCuenta);
            
            const token = await axios.post(Env.get('BACKEND') + `/ventas/filtro`, datosCuenta).then((resultado) => {
                return resultado
            }).catch((err) => {
                return err
            })
    
            if (token.status == 200) {
                appToken = token.data
            }
        }
    

        if (appToken != '') {

            console.log('token');
            
            

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
                console.log(err);
                
                return null
            })
            if (navegacion) {

                console.log('entro a navegacion');
                

                let correos: any;

                let marcacion: any;

                if (navegacion.customData) {
console.log('entro a data navegación');

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
                            ir.push({"ir":datos.mar_id})
                            em.push(datos.mar_correo_cliente)
                        });

                        marcacion = JSON.stringify(ir)
                        correos = em

                    }



                }
                console.log({marcacion}) 
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
                        return item.name
                    })


                    const venta = {
                        id: uuidAPIKey.create().uuid,
                        ordenCompra: navegacion.orderId,
                        fechaOrden: navegacion.creationDate,
                        marcacion,
                        valorTotal: valorTotal.toString(),
                        productos,
                        flete: flete.toString(),
                        correos
                    }

                    console.log(venta);
                    
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