import Route from '@ioc:Adonis/Core/Route'
const controlador = "../../Presentacion/historial/ControladorHistorial"

Route.group(() => {
  Route.post('/', controlador+'.guardar')
  Route.get('/', controlador+'.buscar')
}).prefix('/api/v1/shopify')
