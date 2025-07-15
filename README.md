# 🚀 API REST de Productos | Talento Tech

**Proyecto Final - Curso Backend TALENTO TECH - Julio 2025**

👩‍💻 Autor: Emmanuel Cruz

## 📝 **Descripción del Proyecto**

API RESTful diseñada para administrar un catálogo de productos.

🔐 Protegida mediante autenticación por token (JWT)
☁️ Conectada a una base de datos NoSQL en **Firebase Firestore**

Permite realizar operaciones CRUD:

- **GET** productos
- **POST** nuevo producto
- **DELETE** por ID
- **GET** por ID

Además, gestiona errores 404, 401/403 y 500 según corresponda.

📌 La arquitectura del proyecto está organizada en capas:

- `routes/`: define las rutas de productos y login
- `controllers/`: recibe las peticiones HTTP
- `services/`: contiene la lógica de negocio
- `models/`: accede a la base de datos en Firebase
- `middlewares/`: validación de tokens JWT
- `config/`: configuración de Firebase y variables de entorno

## 🔗 **API desplegada**

https://talento-tech-api.vercel.app/

🧪 **Pruebas en Postman:** Podés probar todos los endpoints usando esta URL base en lugar de localhost.

## 🧰 **Tecnologías Utilizadas**

- ⚙️ **Node.js + Express**
- 🔐 **JWT** (JSON Web Tokens)
- 🔒 **bcrypt** (hash de contraseñas)
- ☁️ **Firebase Firestore**
- 🌐 **CORS**
- 🧪 **Postman** (testing)
- ⚙️ **dotenv**
- 📦 **body-parser**
- 📁 **Git + GitHub**
- 🚀 **Vercel** (deploy)

## 🚀 **Instalación y Configuración**

### 1. Clonar el repositorio

```bash
git clone https://github.com/emmanuel-cruz-dev/talento-tech-api.git
cd producto-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000
JWT_SECRET=tu_clave_super_secreta

# Firebase Configuration
FIREBASE_API_KEY= #tus credenciales de firestore
FIREBASE_AUTH_DOMAIN= #tus credenciales de firestore
FIREBASE_PROJECT_ID= #tus credenciales de firestore
FIREBASE_STORAGE_BUCKET= #tus credenciales de firestore
FIREBASE_MESSAGING_SENDER_ID= #tus credenciales de firestore
FIREBASE_APP_ID= #tus credenciales de firestore
```

### 4. Ejecutar el servidor

```bash
npm start
# o para desarrollo:
npm run dev
```

Servidor corriendo en: `http://localhost:3000`

## 🔐 **Autenticación**

### Endpoint de Login

**POST** `/auth/login`

### Usuarios de prueba disponibles:

| Username | Password      | Role  |
| -------- | ------------- | ----- |
| `admin`  | `password123` | admin |
| `user1`  | `password123` | user  |

### Ejemplo de login exitoso:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
```

**Respuesta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzIxMjM0NTY3LCJleHAiOjE3MjEyMzgxNjd9.abc123..."
}
```

### Ejemplo de login fallido:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "wrong"}'
```

**Respuesta:**

```json
{
  "error": "Credenciales inválidas"
}
```

## 📋 **Endpoints de la API**

### Autenticación

| Método | Endpoint      | Descripción    | Requiere Auth |
| ------ | ------------- | -------------- | ------------- |
| POST   | `/auth/login` | Iniciar sesión | ❌            |

### Productos

| Método | Endpoint              | Descripción                 | Requiere Auth |
| ------ | --------------------- | --------------------------- | ------------- |
| GET    | `api/products`        | Obtener todos los productos | ✅            |
| GET    | `api/products/:id`    | Obtener producto por ID     | ✅            |
| POST   | `api/products/create` | Crear nuevo producto        | ✅            |
| DELETE | `api/products/:id`    | Eliminar producto           | ✅            |

## 🛠 **Cómo usar los endpoints protegidos**

### 1. Obtener token de autenticación

```bash
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

### 2. Usar el token en requests posteriores

```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer tu_token_aqui"
```

### 3. Ejemplo con Postman

1. **Headers** → Add `Authorization: Bearer tu_token_aqui`
2. **Body** → raw → JSON para POST requests

## 📊 **Ejemplos de uso**

### Crear producto

```bash
curl -X POST http://localhost:3000/api/products/create \
  -H "Authorization: Bearer tu_token_aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "fideos",
    "precio": 1200,
    "disponible": true,
    "categoria": "alimentos"
  }'
```

### Obtener todos los productos

```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer tu_token_aqui"
```

### Eliminar producto

```bash
curl -X DELETE http://localhost:3000/api/products/producto_id \
  -H "Authorization: Bearer tu_token_aqui"
```

## ⚠️ **Códigos de Error**

| Código | Descripción                                |
| ------ | ------------------------------------------ |
| 200    | OK - Solicitud exitosa                     |
| 201    | Created - Recurso creado                   |
| 400    | Bad Request - Datos inválidos              |
| 401    | Unauthorized - Token requerido             |
| 403    | Forbidden - Token inválido/expirado        |
| 404    | Not Found - Recurso no encontrado          |
| 500    | Internal Server Error - Error del servidor |

## 🔒 **Seguridad**

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración de 1 hora
- ✅ Validación de entrada en todos los endpoints
- ✅ Manejo de errores personalizado
- ✅ Variables de entorno para datos sensibles

## 📁 **Estructura del Proyecto**

```
src/
├── index.js
├── config/
│   └── firebase.config.js
├── controllers/
│   ├── auth.controller.js
│   └── product.controller.js
├── middlewares/
│   └── auth.middleware.js
├── models/
│   ├── product.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   └── product.routes.js
├── services/
│   ├── auth.service.js
│   └── product.service.js
├── views/
│   └── home.html
├── .env
├── .env.example
├── .gitignore
├── api.http
├── package.json
├── vercel.json
└── README.md
```

## 📜 **Licencia**

Proyecto educativo para **Talento Tech 2025**
