/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar un nuevo usuario
 *     description: Crea una nueva cuenta de usuario. Puede ser USER o STORE. Las tiendas deben proporcionar storeInfo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           examples:
 *             user:
 *               summary: Registrar usuario regular
 *               value:
 *                 email: "user@example.com"
 *                 password: "password123"
 *                 username: "johndoe"
 *                 role: "user"
 *                 profile:
 *                   firstName: "John"
 *                   lastName: "Doe"
 *             store:
 *               summary: Registrar tienda
 *               value:
 *                 email: "store@example.com"
 *                 password: "password123"
 *                 username: "mystore"
 *                 role: "store"
 *                 storeInfo:
 *                   storeName: "My Awesome Store"
 *                   description: "We sell quality products"
 *                   logo: "https://example.com/logo.png"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Error de validación o email/username ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missingFields:
 *                 summary: Campos faltantes
 *                 value:
 *                   error: "Campos requeridos faltantes"
 *                   message: "Email, password y username son requeridos"
 *               weakPassword:
 *                 summary: Contraseña débil
 *                 value:
 *                   error: "Contraseña débil"
 *                   message: "La contraseña debe tener al menos 6 caracteres"
 *               emailTaken:
 *                 summary: Email ya registrado
 *                 value:
 *                   error: "Error al registrar usuario"
 *                   message: "El email ya está registrado"
 *
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y devuelve un token JWT válido por 7 días
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Credenciales faltantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Credenciales inválidas o usuario inactivo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidCredentials:
 *                 summary: Credenciales incorrectas
 *                 value:
 *                   error: "Error al iniciar sesión"
 *                   message: "Credenciales inválidas"
 *               userInactive:
 *                 summary: Usuario inactivo
 *                 value:
 *                   error: "Error al iniciar sesión"
 *                   message: "Usuario inactivo. Contacta al administrador"
 *
 * /auth/profile:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Obtener perfil del usuario autenticado
 *     description: Devuelve la información del usuario actual basado en el token JWT
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil obtenido"
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "abc123"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /auth/change-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Cambiar contraseña
 *     description: Permite al usuario cambiar su contraseña actual
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña cambiada exitosamente"
 *       400:
 *         description: Error de validación o contraseña incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missingFields:
 *                 summary: Campos faltantes
 *                 value:
 *                   error: "Campos requeridos"
 *                   message: "currentPassword y newPassword son requeridos"
 *               weakPassword:
 *                 summary: Contraseña débil
 *                 value:
 *                   error: "Contraseña débil"
 *                   message: "La nueva contraseña debe tener al menos 6 caracteres"
 *               wrongPassword:
 *                 summary: Contraseña actual incorrecta
 *                 value:
 *                   error: "Error al cambiar contraseña"
 *                   message: "Contraseña actual incorrecta"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export {};
