/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener lista de productos con paginación
 *     description: Endpoint público para listar productos con filtros, búsqueda y paginación
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Número de productos por página
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, price, createdAt, category, rating, stock, brand]
 *           default: createdAt
 *         description: Campo por el cual ordenar
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Orden ascendente o descendente
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar en nombre y descripción del producto
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *         example: "Electronics"
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filtrar por marca
 *         example: "HP"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           format: float
 *           minimum: 0
 *         description: Precio mínimo
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           format: float
 *           minimum: 0
 *         description: Precio máximo
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *         description: Rating mínimo
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filtrar por productos activos/inactivos
 *       - in: query
 *         name: ownerId
 *         schema:
 *           type: string
 *         description: Filtrar productos por ID de tienda
 *       - in: query
 *         name: startAfter
 *         schema:
 *           type: string
 *         description: Cursor para paginación (ID del último producto)
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedProducts'
 *       400:
 *         description: Error de validación en parámetros
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener un producto por ID
 *     description: Endpoint público para obtener detalles de un producto específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 payload:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: ID no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     tags:
 *       - Products
 *     summary: Actualizar un producto
 *     description: Solo el STORE dueño del producto o un ADMIN puede actualizarlo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductRequest'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 payload:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: ID no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: No tienes permisos para actualizar este producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     tags:
 *       - Products
 *     summary: Eliminar un producto
 *     description: Solo el STORE dueño del producto o un ADMIN puede eliminarlo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto con ID 'abc123' eliminado correctamente."
 *                 payload:
 *                   type: object
 *                   nullable: true
 *       400:
 *         description: ID no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: No tienes permisos para eliminar este producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /products/create:
 *   post:
 *     tags:
 *       - Products
 *     summary: Crear un nuevo producto
 *     description: Solo usuarios con rol STORE o ADMIN pueden crear productos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto creado exitosamente"
 *                 payload:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Campos requeridos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado (no tiene rol STORE o ADMIN)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /products/bulk:
 *   post:
 *     tags:
 *       - Products
 *     summary: Crear múltiples productos
 *     description: Crea varios productos a la vez. Solo para STORE o ADMIN
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/CreateProductRequest'
 *           example:
 *             - name: "Producto 1"
 *               price: 99.99
 *               category: "Electronics"
 *               description: "Description 1"
 *             - name: "Producto 2"
 *               price: 149.99
 *               category: "Clothing"
 *               description: "Description 2"
 *     responses:
 *       201:
 *         description: Productos creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Productos creados exitosamente"
 *                 createdCount:
 *                   type: integer
 *                   example: 10
 *                 invalidCount:
 *                   type: integer
 *                   example: 0
 *                 payload:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "10 productos creados exitosamente"
 *       400:
 *         description: Array vacío o sin productos válidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado (no tiene rol STORE o ADMIN)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export {};
