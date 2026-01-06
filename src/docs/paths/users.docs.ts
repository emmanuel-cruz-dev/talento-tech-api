/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
 *     description: Lista todos los usuarios del sistema. Solo accesible para ADMIN
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lista de usuarios"
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 total:
 *                   type: integer
 *                   example: 25
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado (no es ADMIN)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Acceso denegado"
 *               message: "Necesitas rol admin para acceder a este recurso"
 *               yourRole: "user"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /users/role/{role}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener usuarios por rol
 *     description: Lista usuarios filtrados por rol (user, store, admin). Solo ADMIN
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [user, store, admin]
 *         description: Rol de usuario a filtrar
 *     responses:
 *       200:
 *         description: Usuarios obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuarios con rol store"
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 total:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Rol inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Rol inválido"
 *               message: "El rol debe ser: user, store, admin"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado (no es ADMIN)
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
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener usuario por ID
 *     description: Obtiene información de un usuario específico. El usuario puede ver su propia info o el ADMIN puede ver cualquier usuario
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario obtenido"
 *                 payload:
 *                   $ref: '#/components/schemas/User'
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
 *         description: Acceso denegado (intenta ver otro usuario sin ser ADMIN)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Acceso denegado"
 *               message: "Solo puedes acceder a tus propios recursos"
 *       404:
 *         description: Usuario no encontrado
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
 *       - Users
 *     summary: Actualizar usuario
 *     description: El usuario puede actualizar su propia información o el ADMIN puede actualizar cualquier usuario. Solo ADMIN puede cambiar roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newemail@example.com"
 *               username:
 *                 type: string
 *                 example: "newusername"
 *               role:
 *                 type: string
 *                 enum: [user, store, admin]
 *                 description: Solo ADMIN puede cambiar roles
 *                 example: "store"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               profile:
 *                 $ref: '#/components/schemas/UserProfile'
 *               storeInfo:
 *                 $ref: '#/components/schemas/StoreInfo'
 *           examples:
 *             updateProfile:
 *               summary: Actualizar perfil
 *               value:
 *                 profile:
 *                   firstName: "John"
 *                   lastName: "Doe Updated"
 *                   phone: "+1234567890"
 *             changeRole:
 *               summary: Cambiar rol (solo ADMIN)
 *               value:
 *                 role: "store"
 *                 storeInfo:
 *                   storeName: "New Store"
 *                   description: "Store description"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario actualizado exitosamente"
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
 *         description: Acceso denegado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               notOwner:
 *                 summary: Intenta actualizar otro usuario
 *                 value:
 *                   error: "Acceso denegado"
 *                   message: "Solo puedes acceder a tus propios recursos"
 *               changeOwnRole:
 *                 summary: Usuario intenta cambiar su propio rol
 *                 value:
 *                   error: "Acción no permitida"
 *                   message: "No puedes cambiar tu propio rol"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar usuario
 *     description: Solo ADMIN puede eliminar usuarios. No puede eliminarse a sí mismo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado exitosamente"
 *       400:
 *         description: ID no proporcionado o intenta eliminarse a sí mismo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missingId:
 *                 summary: ID no proporcionado
 *                 value:
 *                   error: "ID requerido"
 *               selfDelete:
 *                 summary: Intenta eliminarse a sí mismo
 *                 value:
 *                   error: "Acción no permitida"
 *                   message: "No puedes eliminar tu propia cuenta"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado (no es ADMIN)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
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
 * /users/{id}/toggle-status:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Activar/Desactivar usuario
 *     description: Solo ADMIN puede cambiar el estado de activación de usuarios. No puede desactivarse a sí mismo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Estado cambiado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario desactivado exitosamente"
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "abc123"
 *                     isActive:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: ID no proporcionado o intenta desactivarse a sí mismo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missingId:
 *                 summary: ID no proporcionado
 *                 value:
 *                   error: "ID requerido"
 *               selfDeactivate:
 *                 summary: Intenta desactivarse a sí mismo
 *                 value:
 *                   error: "Acción no permitida"
 *                   message: "No puedes desactivar tu propia cuenta"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado (no es ADMIN)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
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
