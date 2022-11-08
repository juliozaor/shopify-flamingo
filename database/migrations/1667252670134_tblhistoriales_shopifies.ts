import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblhistorialesShopifies extends BaseSchema {
  protected tableName = 'tblhistoriales_shopifies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('shop_id')
      table.json('shop_valor')
      table.boolean('shop_estado').defaultTo(true)
      table.timestamp('shop_creacion', { useTz: true })
      table.timestamp('shop_actualizacion', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
