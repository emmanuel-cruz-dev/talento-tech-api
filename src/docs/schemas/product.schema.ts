/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "prod123"
 *         name:
 *           type: string
 *           example: "Laptop HP"
 *         description:
 *           type: string
 *           example: "High performance laptop"
 *         price:
 *           type: number
 *           format: float
 *           example: 999.99
 *         image:
 *           type: string
 *           example: "https://example.com/laptop.jpg"
 *         category:
 *           type: string
 *           example: "Electronics"
 *         stock:
 *           type: integer
 *           example: 10
 *         rating:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           example: 4.5
 *         brand:
 *           type: string
 *           example: "HP"
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
 *         ownerId:
 *           type: string
 *           example: "store123"
 *         ownerName:
 *           type: string
 *           example: "Tech Store"
 *
 *     CreateProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: "New Product"
 *         description:
 *           type: string
 *           example: "Product description"
 *         price:
 *           type: number
 *           format: float
 *           example: 99.99
 *         image:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         category:
 *           type: string
 *           example: "Electronics"
 *         stock:
 *           type: integer
 *           default: 0
 *           example: 10
 *         rating:
 *           type: number
 *           format: float
 *           default: 0
 *           example: 4.0
 *         brand:
 *           type: string
 *           default: "Sin marca"
 *           example: "BrandX"
 *         isActive:
 *           type: boolean
 *           default: true
 *           example: true
 *
 *     UpdateProductRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Updated Product"
 *         description:
 *           type: string
 *           example: "Updated description"
 *         price:
 *           type: number
 *           format: float
 *           example: 149.99
 *         image:
 *           type: string
 *           example: "https://example.com/new-image.jpg"
 *         category:
 *           type: string
 *           example: "Electronics"
 *         stock:
 *           type: integer
 *           example: 5
 *         rating:
 *           type: number
 *           format: float
 *           example: 4.5
 *         brand:
 *           type: string
 *           example: "BrandY"
 *         isActive:
 *           type: boolean
 *           example: false
 *
 *     PaginatedProducts:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Lista de productos"
 *         payload:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 100
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             totalPages:
 *               type: integer
 *               example: 10
 *             hasNext:
 *               type: boolean
 *               example: true
 *             hasPrev:
 *               type: boolean
 *               example: false
 *             nextCursor:
 *               type: string
 *               example: "prod456"
 *
 */
export {};
