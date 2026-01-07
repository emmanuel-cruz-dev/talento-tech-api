# 🚀 API REST de Productos | Talento Tech

**Proyecto Final - Curso Backend TALENTO TECH - Julio 2025**

👩‍💻 Autor: Emmanuel Cruz

## 📝 **Descripción del Proyecto**

API RESTful completa para gestión de productos y usuarios con autenticación JWT.

🔐 Sistema de autenticación con roles (USER, STORE, ADMIN)  
☁️ Base de datos NoSQL en **Firebase Firestore**  
📚 Documentación interactiva con **Swagger UI**  
🚀 Desplegada en **Vercel**

### Características principales:

- ✅ **CRUD completo de productos** con paginación, filtros y búsqueda
- ✅ **Sistema de usuarios** con registro, login y gestión de perfiles
- ✅ **Roles y permisos** (USER, STORE, ADMIN)
- ✅ **Autenticación JWT** con tokens de 7 días
- ✅ **Documentación Swagger** interactiva
- ✅ **Validación de datos** con express-validator
- ✅ **Arquitectura en capas** (routes, controllers, services, models)

## 🔗 **Demo en Vivo**

🌐 **API Base URL:** https://talento-tech-api.vercel.app  
📚 **Documentación Swagger:** https://talento-tech-api.vercel.app/api/v1/docs

⚠️ **Importante:** Puedes probar todos los endpoints directamente desde Swagger UI o usando Postman/cURL.

## 🧰 **Tecnologías Utilizadas**

- ⚙️ **Node.js + Express + TypeScript**
- 🔐 **JWT** (JSON Web Tokens)
- 🔒 **bcrypt** (hash de contraseñas)
- ☁️ **Firebase Firestore** (base de datos)
- 📚 **Swagger UI** (documentación)
- ✅ **express-validator** (validación)
- 🌐 **CORS**
- � **Vercel** (deploy)
- 📁 **Git + GitHub**

## 🚀 **Instalación y Configuración**

### 1. Clonar el repositorio

```bash
git clone https://github.com/emmanuel-cruz-dev/talento-tech-api.git
cd talento-tech-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar tu propia base de datos Firebase

Para ejecutar este proyecto localmente, necesitarás crear tu propia instancia de Firebase:

#### Crear proyecto en Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear proyecto"
3. Sigue el asistente de configuración

#### Configurar Firestore:

1. En tu proyecto Firebase, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Modo de prueba" para desarrollo

#### Obtener credenciales:

1. Ve a Configuración del proyecto (ícono de engranaje)
2. En la pestaña "Cuentas de servicio", genera una nueva clave privada
3. Descarga el archivo JSON con las credenciales

### 4. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000
JWT_SECRET=tu_clave_super_secreta_muy_larga_y_segura

# Firebase Admin SDK (Service Account)
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-project-id.iam.gserviceaccount.com

# Firebase Client SDK
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu-project-id.firebaseapp.com
FIREBASE_STORAGE_BUCKET=tu-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 5. Ejecutar el servidor

```bash
# Desarrollo (con hot reload)
npm run dev

# Producción
npm run build
npm start
```

Servidor corriendo en: `http://localhost:3000`
Documentación Swagger: `http://localhost:3000/api/v1/docs`

## � **Documentación de la API**

### Swagger UI Interactivo

La forma más fácil de explorar y probar la API es usando Swagger UI:

🔗 **Local:** http://localhost:3000/api/v1/docs
🔗 **Producción:** https://talento-tech-api.vercel.app/api/v1/docs

Desde Swagger puedes:
- Ver todos los endpoints disponibles
- Probar requests directamente desde el navegador
- Ver ejemplos de request/response
- Autenticarte con tu token JWT

## 🔐 **Sistema de Autenticación**

### Roles disponibles:

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **USER** | Usuario regular | Ver productos, gestionar su perfil |
| **STORE** | Tienda/Vendedor | Crear y gestionar sus propios productos |
| **ADMIN** | Administrador | Acceso total al sistema |

### Flujo de autenticación:

1. **Registrarse:** `POST /api/v1/auth/register`
2. **Iniciar sesión:** `POST /api/v1/auth/login`
3. **Usar el token** en el header `Authorization: Bearer <token>`

### Ejemplo de registro:

```bash
curl -X POST https://talento-tech-api.vercel.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "password123",
    "username": "miusuario",
    "role": "user",
    "profile": {
      "firstName": "Juan",
      "lastName": "Pérez"
    }
  }'
```

### Ejemplo de login:

```bash
curl -X POST https://talento-tech-api.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "password123"
  }'
```

**Respuesta:**

```json
{
  "message": "Login exitoso",
  "payload": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "abc123",
      "email": "usuario@example.com",
      "username": "miusuario",
      "role": "user"
    }
  }
}
```

## 📋 **Endpoints Principales**

### 🔐 Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Registrar nuevo usuario | ❌ |
| POST | `/api/v1/auth/login` | Iniciar sesión | ❌ |
| GET | `/api/v1/auth/profile` | Obtener perfil actual | ✅ |
| POST | `/api/v1/auth/change-password` | Cambiar contraseña | ✅ |

### 📦 Productos

| Método | Endpoint | Descripción | Auth | Roles |
|--------|----------|-------------|------|-------|
| GET | `/api/v1/products` | Listar productos (con paginación) | ❌ | Público |
| GET | `/api/v1/products/:id` | Obtener producto por ID | ❌ | Público |
| POST | `/api/v1/products/create` | Crear producto | ✅ | STORE, ADMIN |
| PUT | `/api/v1/products/:id` | Actualizar producto | ✅ | STORE (owner), ADMIN |
| DELETE | `/api/v1/products/:id` | Eliminar producto | ✅ | STORE (owner), ADMIN |
| POST | `/api/v1/products/bulk` | Crear múltiples productos | ✅ | STORE, ADMIN |

### � Usuarios (Solo ADMIN)

| Método | Endpoint | Descripción | Auth | Roles |
|--------|----------|-------------|------|-------|
| GET | `/api/v1/users` | Listar todos los usuarios | ✅ | ADMIN |
| GET | `/api/v1/users/role/:role` | Usuarios por rol | ✅ | ADMIN |
| GET | `/api/v1/users/:id` | Obtener usuario por ID | ✅ | ADMIN, Owner |
| PUT | `/api/v1/users/:id` | Actualizar usuario | ✅ | ADMIN, Owner |
| DELETE | `/api/v1/users/:id` | Eliminar usuario | ✅ | ADMIN |
| PATCH | `/api/v1/users/:id/toggle-status` | Activar/Desactivar usuario | ✅ | ADMIN |

## � **Ejemplos de Uso**

### Crear un producto

```bash
curl -X POST https://talento-tech-api.vercel.app/api/v1/products/create \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop HP Pavilion",
    "description": "Laptop de alto rendimiento",
    "price": 899.99,
    "category": "Electronics",
    "brand": "HP",
    "stock": 10,
    "image": "https://example.com/laptop.jpg"
  }'
```

### Listar productos con filtros

```bash
# Productos de categoría Electronics, ordenados por precio
curl "https://talento-tech-api.vercel.app/api/v1/products?category=Electronics&sortBy=price&order=asc&limit=10"
```

### Buscar productos

```bash
# Buscar productos que contengan "laptop" en nombre o descripción
curl "https://talento-tech-api.vercel.app/api/v1/products?search=laptop"
```

## ⚠️ **Códigos de Respuesta**

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos o faltantes |
| 401 | Unauthorized - Token requerido o inválido |
| 403 | Forbidden - Sin permisos para esta acción |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## 🔒 **Seguridad**

- ✅ Contraseñas hasheadas con **bcrypt**
- ✅ Tokens JWT con expiración de **7 días**
- ✅ Validación de entrada con **express-validator**
- ✅ Middleware de autenticación y autorización por roles
- ✅ Variables de entorno para datos sensibles
- ✅ CORS configurado
- ✅ Manejo de errores centralizado

## 📁 **Estructura del Proyecto**

```
src/
├── index.ts                    # Punto de entrada
├── app.ts                      # Configuración de Express
├── config/
│   └── firebase.config.ts      # Configuración de Firebase
├── controllers/                # Controladores HTTP
│   ├── auth.controller.ts
│   ├── product.controller.ts
│   └── user.controller.ts
├── services/                   # Lógica de negocio
│   ├── auth.service.ts
│   ├── product.service.ts
│   └── user.service.ts
├── models/                     # Acceso a datos
│   ├── product.model.ts
│   └── user.model.ts
├── middlewares/                # Middlewares
│   ├── auth.middleware.ts
│   └── role.middleware.ts
├── routes/                     # Definición de rutas
│   ├── index.ts
│   ├── auth.routes.ts
│   ├── product.routes.ts
│   └── user.routes.ts
├── docs/                       # Documentación Swagger
│   ├── swagger.ts
│   ├── paths/
│   │   ├── auth.docs.ts
│   │   ├── products.docs.ts
│   │   └── users.docs.ts
│   └── schemas/
│       ├── common.schema.ts
│       ├── product.schema.ts
│       └── user.schema.ts
├── types/                      # Tipos TypeScript
│   └── express.d.ts
└── validators/                 # Validadores
    ├── auth.validator.ts
    ├── product.validator.ts
    └── user.validator.ts

public/
├── home.html                   # Página de inicio
├── swagger.html                # UI de Swagger
└── swagger-spec.json           # Especificación OpenAPI generada

scripts/
└── generate-swagger.ts         # Script para generar spec de Swagger
```

## 🔄 **Actualizar Documentación de Swagger**

Si necesitas modificar la documentación de la API:

1. Edita los archivos en `src/docs/paths/*.ts` o `src/docs/schemas/*.ts`
2. Regenera el spec estático:
   ```bash
   npx tsx scripts/generate-swagger.ts
   ```
3. Commit de ambos archivos (`.ts` modificados y `swagger-spec.json`)

El spec se regenera automáticamente durante el build en Vercel.

## 🚀 **Deploy en Vercel**

El proyecto está configurado para deployment automático en Vercel:

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel Dashboard
3. Cada push a `main` despliega automáticamente

El archivo `vercel.json` ya está configurado correctamente.

## 📜 **Licencia**

Proyecto educativo para **Talento Tech 2025**

---

**Desarrollado por Emmanuel Cruz**
