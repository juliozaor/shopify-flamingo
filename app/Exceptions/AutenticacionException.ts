import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AutenticacionException extends Exception {
    public async handle(error:this, ctx: HttpContextContract) {
        ctx.response.status(401).send({
            mensaje: error.message,
            estado: 401,
            origen: ctx.request.url(),
        })
    }
}
