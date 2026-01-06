/**
 * @openapi
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Operación exitosa"
 *         payload:
 *           type: object
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Error message"
 *         message:
 *           type: string
 *           example: "Detailed error message"
 *
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error de validación en los parámetros"
 *         payload:
 *           type: object
 *           properties:
 *             errors:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                     example: "price"
 *                   message:
 *                     type: string
 *                     example: "El precio debe ser mayor a 0"
 *                   value:
 *                     example: -10
 */
export {};
