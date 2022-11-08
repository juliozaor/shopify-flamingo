import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class JwtExpiradoException extends Exception {
    public async handle(error: this,ctx: HttpContextContract) {
        ctx.response.status(401).send({
            mensaje: `Token Expirado | ${error.message}`,
            estado: 401,
            origen: ctx.request.url(),
            token_valido: false,
            token_expirado: true
        })
    }
}
