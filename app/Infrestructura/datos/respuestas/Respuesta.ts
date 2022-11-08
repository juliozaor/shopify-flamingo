
export class Respuesta {
    public estado: number;
    public mensaje: string;
   

    constructor(modulo: any = null, err?: any) {
        if (modulo != null) {
            this.mensaje =  modulo;
            this.estado = err;
        }else{
            this.mensaje = "almacenado";
            this.estado = 200;
        }
    }
    
    public retorno(): Respuesta{
        return this
    }

    public exitente(): Respuesta{
        this.mensaje = "Ya se hizo el registro de este elemento"
        return this
    }

}