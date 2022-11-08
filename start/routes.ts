import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return " "
})
Route.get('/docs', async ({ response }) => {
  response.redirect().toPath('/docs')
})


