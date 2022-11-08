import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import { Historial } from '../../../Dominio/Datos/Entidades/Historial';

export class TblhistorialesShopify extends BaseModel {

    @column({ columnName: 'shop_id' })
    public id: string;

    @column({ columnName: 'shop_valor' })
    public valor: JSON;

    @column({ columnName: 'shop_estado' })
    public estado: boolean;


    @column.dateTime({ autoCreate: true, columnName: 'shop_creacion' })
    public creacion: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'shop_actualizacion' })
    public actualizacion: DateTime

    convertirHistorial(historial:Historial){
        this.id = historial.id;
        this.valor = historial.valor
        this.estado = historial.estado? historial.estado : true
        return this
      }

}

