    /**
     * @swagger
     * components:
     *  schemas:
     *      Aliado:
     *          type: object
     *          properties:
     *              id:
     *                  type: string
     *                  format: uuid
     *                  description: Identificador autogenerado del aliado
     *              nombre:
     *                  type: string
     *                  description: Nombre del aliado
     *              logo:
     *                  type: string
     *                  description: Logotipo
     *              orden:
     *                  type: integer
     *                  description: Orden en que aparece el aliado
     *              linkMarcacion:
     *                  type: string
     *                  description: Link autogenerado para la marcación
     *              linkAmigable:
     *                  type: string
     *                  description: Dirección web del aliado
     *              tiempo:
     *                  type: integer
     *                  description: Duranción de la marcación en días
     *              llave:
     *                  type: string
     *                  description: Llave autogenerada
     *              comision:
     *                  type: string
     *                  description: Comisión del aliado
     *              creacion:
     *                  type: date
     *                  description: Fecha de creación
     *              actualizacion:
     *                  type: date
     *                  description: Fecha de actualización
     *              estado:
     *                  type: boolean
     *                  description: Disponibilidad
     *          required:
     *              - nombre
     *              - logo
     *              - tiempo
     *          example:
     *              id: 471cf101-6bf6-4cab-b992-f2f59de9d4da
     *              nombre: Samsung
     *              logo: http://172.16.83.24:8080/api/v1/aliados/archivos/471cf101-6bf6-4cab-b992-f2f59de9d4da.png
     *              orden: 1
     *              linkMarcacion: http://172.16.83.24:8080/api/v1/marcacion?uuidaliado=471cf101-6bf6-4cab-b992-f2f59de9d4da
     *              linkAmigable: https://shop.samsung.com.co
     *              tiempo: 7
     *              llave: HF1V9H7-HTX4012-GVSGAB6-MYQBMK0
     *              comision: 20%
     *              creacion: 2022-09-24T11:16:27.032-05:00
     *              actualizacion: 2022-09-24T11:16:27.032-05:00
     *              estado: true
     * 
     * 
     *      AliadoCuentaCategoria:
     *          type: object
     *          properties:
     *              id:
     *                  type: string
     *                  format: uuid
     *                  description: Identificador autogenerado del aliado
     *              nombre:
     *                  type: string
     *                  description: Nombre del aliado
     *              logo:
     *                  type: string
     *                  description: Logotipo
     *              linkMarcacion:
     *                  type: string
     *                  description: Link autogenerado para la marcación
     *              linkAmigable:
     *                  type: string
     *                  description: Dirección web del aliado
     *              tiempo:
     *                  type: integer
     *                  description: Duranción de la marcación en días
     *              llave:
     *                  type: string
     *                  description: Llave autogenerada
     *              comision:
     *                  type: string
     *                  description: Comisión del aliado
     *              orden:
     *                  type: integer
     *                  description: Orden en que aparece el aliado
     *              creacion:
     *                  type: date
     *                  description: Fecha de creación
     *              actualizacion:
     *                  type: date
     *                  description: Fecha de actualización
     *              estado:
     *                  type: boolean
     *                  description: Disponibilidad del aliado
     *              categorias:
     *                  type: integer
     *                  description: Cantidad de categorias del aliado
     *          required:
     *              - nombre
     *              - logo
     *              - tiempo
     *          example:
     *              id: 471cf101-6bf6-4cab-b992-f2f59de9d4da
     *              nombre: Samsung
     *              logo: http://172.16.83.24:8080/api/v1/aliados/archivos/471cf101-6bf6-4cab-b992-f2f59de9d4da.png
     *              linkMarcacion: http://172.16.83.24:8080/api/v1/marcacion?uuidaliado=471cf101-6bf6-4cab-b992-f2f59de9d4da
     *              linkAmigable: https://shop.samsung.com.co
     *              tiempo: 7
     *              llave: HF1V9H7-HTX4012-GVSGAB6-MYQBMK0
     *              comision: 20%
     *              creacion: 2022-09-24T11:16:27.032-05:00
     *              orden: 1
     *              actualizacion: 2022-09-24T11:16:27.032-05:00
     *              estado: true
     *              categorias: 2
     * 
     *      CategoriasCompletas:
     *          type: object
     *          properties:
     *              id:
     *                  type: string
     *                  format: uuid
     *                  description: Identificador autogenerado de la categoria
     *              nombre:
     *                  type: string
     *                  description: Nombre de la categoria
     *              linkMarcacion:
     *                  type: string
     *                  description: Link autogenerado para la marcación
     *              linkAmigableAliado:
     *                  type: string
     *                  description: Link del aliado con la categoria
     *              imagen:
     *                  type: string
     *                  description: Imagen que identifica a la categoria
     *              orden:
     *                  type: string
     *                  description: Orden en que se muestran las categorias
     *              estado:
     *                  type: boolean
     *                  description: Disponibilidad de la categoria
     *          required:
     *              - nombre
     *              - linkAmigableAliado
     *              - imagen
     *          example:
     *              id: 7794a3ef-38c5-41a8-9b06-5f0644b82d62
     *              nombre: Neveras
     *              linkMarcacion: http://172.16.83.24:8080/api/v1/marcacion?uuidaliado=471cf101-6bf6-4cab-b992-f2f59de9d4da&uuidcategoria=7794a3ef-38c5-41a8-9b06-5f0644b82d62
     *              linkAmigableAliado: https://shop.samsung.com.co/electrodomesticos/neveras-y-nevecones
     *              imagen: http://172.16.83.24:8080/api/v1/categorias/archivos/653e1b20-4849-4975-8c9e-423b09a53a7a.png
     *              orden: 0
     *              estado: true
     * 
     * 
     *      DestacadasAliadoCategoria:
     *          type: object
     *          properties:
     *              idAliado:
     *                  type: string
     *                  format: uuid
     *                  description: Identificador autogenerado del aliado
     *              nombreAliado:
     *                  type: string
     *                  description: Nombre del aliado
     *              imagenAliado:
     *                  type: string
     *                  description: Logotipo del aliado
     *              idCategoria:
     *                  type: string
     *                  format: uuid
     *                  description: Identificador autogenerado de la categoria
     *              nombreCategoria:
     *                  type: string
     *                  description: Nombre de la categoria
     *              imagenCategoria:
     *                  type: string
     *                  description: Logotipo de la categoria
     *              linkMarcacion:
     *                  type: string
     *                  description: Link autogenerado para la marcación
     *              linkAmigableAliado:
     *                  type: string
     *                  description: Dirección web del aliado con la categoria
     *              orden:
     *                  type: integer
     *                  description: orden en que se muestran los datos
     *              estado:
     *                  type: boolean
     *                  description: Disponibilidad del aliado
     *          required:
     *              - nombre
     *              - logo
     *              - tiempo
     *          example:
     *              idAliado: 471cf101-6bf6-4cab-b992-f2f59de9d4da
     *              nombreAliado: Samsung
     *              imagenAliado: http://172.16.83.24:8080/api/v1/aliados/archivos/471cf101-6bf6-4cab-b992-f2f59de9d4da.png
     *              idCategoria: 7794a3ef-38c5-41a8-9b06-5f0644b82d62
     *              nombreCategoria: Neveras
     *              imagenCategoria: http://172.16.83.24:8080/api/v1/categorias/archivos/653e1b20-4849-4975-8c9e-423b09a53a7a.png
     *              linkMarcacion: http://172.16.83.24:8080/api/v1/marcacion?uuidaliado=471cf101-6bf6-4cab-b992-f2f59de9d4da&uuidcategoria=7794a3ef-38c5-41a8-9b06-5f0644b82d62
     *              linkAmigableAliado: https://shop.samsung.com.co/electrodomesticos/neveras-y-nevecones
     *              orden: 0
     *              estado: true 
     * 
     *      AliadoDeCategoria:
     *          type: object
     *          properties:
     *              id:
     *                  type: string
     *                  format: uuid
     *                  description: Identificador autogenerado del aliado
     *              nombre:
     *                  type: string
     *                  description: Nombre del aliado
     *              imagenAliado:
     *                  type: string
     *                  description: Logotipo
     *              orden:
     *                  type: integer
     *                  description: Orden en que aparece el aliado
     *              linkMarcacionAliado:
     *                  type: string
     *                  description: Link autogenerado para la marcación del aliado
     *              linkMarcacionCategoria:
     *                  type: string
     *                  description: Link autogenerado para la marcación de categoría
     *              linkAmigableAliado:
     *                  type: string
     *                  description: Dirección web del aliado
     *              imagenCategoria:
     *                  type: string
     *                  description: Imagen de la categoría
     *              tiempo:
     *                  type: integer
     *                  description: Duranción de la marcación en días
     *              llave:
     *                  type: string
     *                  description: Llave autogenerada
     *              estado:
     *                  type: boolean
     *                  description: Disponibilidad del aliado
     *          example:
     *              id: 20558708-6b41-411f-a3ef-0462f0e73c55
     *              nombre: Claro
     *              imagenAliado: http://172.16.83.24:8090/api/v1/aliados/archivos/20558708-6b41-411f-a3ef-0462f0e73c55.png
     *              tiempo: 7
     *              llave: 8ZWP8GV-FH24Z7A-GEZTE7M-AAA4T3R
     *              linkMarcacionAliado: http://172.16.83.24:8090/api/v1/marcacion?uuidaliado=20558708-6b41-411f-a3ef-0462f0e73c55
     *              linkMarcacionCategoria: http://172.16.83.24:8090/api/v1/marcacion?uuidaliado=20558708-6b41-411f-a3ef-0462f0e73c55&uuidcategoria=dff6d73b-3f60-44bf-bfb3-4a9b67bc18a6
     *              linkAmigableAliado: https://tienda.claro.com.co/claro/celulares
     *              imagenCategoria: http://172.16.83.24:8090/api/v1/categorias/archivos/892791d3-5579-4e8a-9c3c-5a32177eff3c.png
     *              orden: 1
     *              estado: true
     *
     * 
     *      Categoria:
     *          type: object
     *          properties:
     *              id:
     *                  type: string
     *                  format: uuid
     *                  description: Identificador autogenerado de la categoria
     *              nombre:
     *                  type: string
     *                  description: Nombre de la categoria
     *              estado:
     *                  type: boolean
     *                  description: Disponibilidad de la categoria
     *              creacion:
     *                  type: dateTime
     *                  description: Fecha de creación
     *              actualizacion:
     *                  type: dateTime
     *                  description: Fechas de actualización
     *          required:
     *              - nombre
     *          example:
     *              id: 7794a3ef-38c5-41a8-9b06-5f0644b82d62
     *              nombre: Neveras
     *              estado: true 
     *              creacion: 2022-09-24T14:27:06.773Z
     *              actualizacion: 2022-09-24T14:27:06.773Z
     * 
     * 
     *      200:
     *          type: object
     *          properties:
     *              mensaje:
     *                  type: string
     *                  description: Descripción de la respuesta
     *              estado:
     *                  type: integer
     *                  description: Estado de la respuesta   
     *          example:
     *              mensaje: Acción ejecutada correctamente
     *              estado: 200
     * 
     * 
     *      400:
     *          type: object
     *          properties:
     *              mensaje:
     *                  type: string
     *                  description: Descripción de la respuesta
     *              estado:
     *                  type: integer
     *                  description: Estado de la respuesta   
     *          example:
     *              mensaje: La petición no se realizo de manera correcta
     *              estado: 400
     * 
     * 
     *      500:
     *          type: object
     *          properties:
     *              mensaje:
     *                  type: string
     *                  description: Descripción de la respuesta
     *              estado:
     *                  type: integer
     *                  description: Estado de la respuesta   
     *          example:
     *              mensaje: Se presento un problema en el servidor
     *              estado: 500
     * 
     * 
     *      Paginacion:
     *          type: object
     *          properties:
     *              totalRegistros:
     *                  type: integer
     *                  description: Número de elementos en total
     *              paginaActual:
     *                  type: integer
     *                  description: Página actual
     *              totalPaginas:
     *                  type: integer
     *                  description: Total de páginas 
     *          example:
     *              totalRegistros: 9
     *              paginaActual: 1
     *              totalPaginas: 1
     * 
     * 
     *  parameters:
     *      Pagina:
     *          in: path
     *          name: pagina
     *          required: false
     *          schema:
     *              type: integer
     *              description: número de página
     *      Limite:
     *          in: path
     *          name: limite
     *          required: false
     *          schema:
     *              type: integer
     *              description: limite de la consulta
     *      AdministrarNoObligatorio:
     *          in: query
     *          name: esAdministrador
     *          required: false
     *          schema:
     *              type: boolean
     *              description: Determina si la consulta procede del administrador  
     *      AdministrarObligatorio:
     *          in: query
     *          name: esAdministrador
     *          required: true
     *          schema:
     *              type: boolean
     *              description: Determina si la consulta procede del administrador
     *      IdentificadorAliado:
     *          in: path
     *          name: idAliado
     *          required: true
     *          schema:
     *              type: string
     *              description: identificador aliado
     *      IdentificadorCategoria:
     *          in: path
     *          name: idCategoria
     *          required: true
     *          schema:
     *              type: string
     *              description: identificador categoría
     */
    

    /**
     * @swagger
     * tags:
     *  name: Aliados
     *  description: Endpoints de aliados
     */
    /**
     * @swagger
     * tags:
     *  name: Categorias
     *  description: Endpoint para categorias
     */
    /**
     * @swagger
     * tags:
     *  name: AutenticacionJWT
     *  description: Endpoint para usuarios
     */