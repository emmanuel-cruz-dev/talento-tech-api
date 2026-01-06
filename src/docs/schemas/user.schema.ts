/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123xyz"
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         username:
 *           type: string
 *           example: "johndoe"
 *         role:
 *           type: string
 *           enum: [user, store, admin]
 *           example: "user"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *         profile:
 *           $ref: '#/components/schemas/UserProfile'
 *         storeInfo:
 *           $ref: '#/components/schemas/StoreInfo'
 *
 *     UserProfile:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         avatar:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         address:
 *           $ref: '#/components/schemas/Address'
 *
 *     Address:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           example: "New York"
 *         state:
 *           type: string
 *           example: "NY"
 *         zipCode:
 *           type: string
 *           example: "10001"
 *         country:
 *           type: string
 *           example: "USA"
 *
 *     StoreInfo:
 *       type: object
 *       properties:
 *         storeName:
 *           type: string
 *           example: "My Awesome Store"
 *         description:
 *           type: string
 *           example: "We sell quality products"
 *         logo:
 *           type: string
 *           example: "https://example.com/logo.png"
 *         verified:
 *           type: boolean
 *           example: false
 *         totalSales:
 *           type: number
 *           example: 0
 *         rating:
 *           type: number
 *           example: 0
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "newuser@example.com"
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: "password123"
 *         username:
 *           type: string
 *           example: "newuser"
 *         role:
 *           type: string
 *           enum: [user, store, admin]
 *           default: user
 *           example: "user"
 *         storeInfo:
 *           $ref: '#/components/schemas/StoreInfoInput'
 *         profile:
 *           $ref: '#/components/schemas/UserProfile'
 *
 *     StoreInfoInput:
 *       type: object
 *       required:
 *         - storeName
 *       properties:
 *         storeName:
 *           type: string
 *           example: "My Store"
 *         description:
 *           type: string
 *           example: "Store description"
 *         logo:
 *           type: string
 *           example: "https://example.com/logo.png"
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "password123"
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Login exitoso"
 *         payload:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "abc123"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 role:
 *                   type: string
 *                   example: "user"
 *
 *     ChangePasswordRequest:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           format: password
 *           example: "oldpassword123"
 *         newPassword:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: "newpassword123"
 */
/*  UpdateUserRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "newemail@example.com"
 *         username:
 *           type: string
 *           example: "newusername"
 *         password:
 *           type: string
 *           format: password
 *           description: Si se proporciona, será hasheada automáticamente
 *           example: "newpassword123"
 *         role:
 *           type: string
 *           enum: [user, store, admin]
 *           example: "store"
 *         isActive:
 *           type: boolean
 *           example: true
 *         profile:
 *           $ref: '#/components/schemas/UserProfile'
 *         storeInfo:
 *           $ref: '#/components/schemas/StoreInfo'
 */
export {};
