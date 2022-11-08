import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env';
import { ServicioAutenticacionJWT } from '../Infrestructura/Servicios/ServicioAutenticacionJWT';

export default class AutenticarAdministrador {

  private adminylogUrl: String = Env.get('HOSTING');
  private adminylogVerificarEndpoint: String = '/token/verificar'

  ServicioAutenticacionJWT
  public async handle(ctx: HttpContextContract | any, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('authorization')

    if (authorizationHeader == undefined) {
      return ctx.response.status(401).send({
        mensaje: "Falta el token de autorización",
        estado: 401,
      })
    }

    const keyToken = authorizationHeader.split(' ')
    const key = keyToken[1]


    if(ctx.request.requestData.esAdministrador && ctx.request.requestData.esAdministrador == 'true') {
      const cuerpoPeticion = {
        token: authorizationHeader
      }


      try {
        await axios.post(`${this.adminylogUrl}${this.adminylogVerificarEndpoint}`, cuerpoPeticion)
        await next()
      } catch (error) {
        if (error.response) {
          if (error.response.data) {
            return ctx.response.status(error.response.status).send(error.response.data)
          } else {
            return ctx.response.status(401).send({
              mensaje: "Se presento un problema con la conexión a la base de datos",
              error,
              estado: 401,
            })
          }
        } else {
          return ctx.response.status(401).send({
            mensaje: "Se presento un problema con la conexión a la base de datos",
            error,
            estado: 401,
          })
        }
      }
    }else{
      if (key == Env.get('KEY')) {
        await next()
      } else {
        const cuerpoPeticion = {
          token: authorizationHeader
        }
  
  
        try {
          await axios.post(`${this.adminylogUrl}${this.adminylogVerificarEndpoint}`, cuerpoPeticion)
          await next()
        } catch (error) {
          if (error.response) {
            if (error.response.data) {
              return ctx.response.status(error.response.status).send(error.response.data)
            } else {
              return ctx.response.status(401).send({
                mensaje: "Se presento un problema con la conexión a la base de datos",
                error,
                estado: 401,
              })
            }
          } else {
            return ctx.response.status(401).send({
              mensaje: "Se presento un problema con la conexión a la base de datos",
              error,
              estado: 401,
            })
          }
        }
      }

    }


   
  }

}