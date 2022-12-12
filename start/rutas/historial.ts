import Route from '@ioc:Adonis/Core/Route'
const controlador = "../../Presentacion/historial/ControladorHistorial"

Route.group(() => {
  Route.post('/', controlador+'.guardarShopify')
  Route.get('/', controlador+'.buscar')
}).prefix('/api/v1/shopify')

Route.group(() => {
  Route.post('/', controlador+'.guardarVtex')
}).prefix('/api/v1/vtex')

Route.get('/api/v1/js/*', controlador+'.mostrarArchivo')