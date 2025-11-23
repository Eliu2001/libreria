# 📚 Sistema de Librería

Sistema de gestión de librería con autenticación JWT, control de inventario y sistema de compras.

## 🚀 Características

- ✅ **Autenticación de usuarios** con JWT
- ✅ **Sistema de roles** (Usuario y Administrador)
- ✅ **Gestión de inventario** de libros
- ✅ **Sistema de compras** con validación de stock
- ✅ **Panel de administración** para gestionar libros
- ✅ **Interfaz responsive** con Bootstrap 5

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Eliu2001/libreria.git
cd libreria
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos PostgreSQL

Crear la base de datos y el usuario:

```sql
CREATE DATABASE librosdb;
CREATE USER librosuser WITH PASSWORD 'Gabriela25';
GRANT ALL PRIVILEGES ON DATABASE librosdb TO librosuser;
```

Otorgar permisos al esquema public:

```sql
\c librosdb
GRANT ALL PRIVILEGES ON SCHEMA public TO librosuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO librosuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO librosuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO librosuser;
```

### 4. Configurar variables de entorno

El archivo `.env` ya está incluido con la siguiente configuración:

```env
PORT=3000
JWT_SECRET=26ce3ae05d4586ae1cb2027215df711242b47b1558fa90b267f870a39eb30fc4760cf69f8d96b97eba5e1de81c06755de821b39f61847b9b95a88faeb4a0876c
DATABASE_URL=postgres://librosuser:Gabriela25@localhost:5432/librosdb
DB_HOST=localhost
DB_PORT=5432
DB_NAME=librosdb
DB_USER=librosuser
DB_PASSWORD=Gabriela25
```

**⚠️ IMPORTANTE:** En producción, cambia el `JWT_SECRET` y las credenciales de la base de datos.

### 5. Inicializar la base de datos con datos de prueba

```bash
node seed.js
```

Este comando creará:
- 2 usuarios de prueba
- 4 libros de ejemplo

## 🎮 Uso

### Iniciar el servidor en modo desarrollo

```bash
npm run dev
```

### Iniciar el servidor en modo producción

```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 👥 Usuarios de Prueba

### Usuario Normal
- **Usuario:** `testuser`
- **Contraseña:** `password123`
- **Permisos:** Ver y comprar libros

### Administrador
- **Usuario:** `admin`
- **Contraseña:** `admin123`
- **Permisos:** Gestión completa del inventario + permisos de usuario

## 📖 Estructura del Proyecto

```
libreria/
├── config/
│   └── database.js          # Configuración de Sequelize
├── controllers/
│   ├── authController.js    # Lógica de autenticación
│   ├── booksControllers.js  # Lógica de libros
│   └── adminController.js   # Lógica del panel admin
├── middlewares/
│   ├── auth.js              # Verificación de JWT
│   └── verifyAdmin.js       # Verificación de rol admin
├── models/
│   ├── User.js              # Modelo de usuario
│   └── Book.js              # Modelo de libro
├── routes/
│   ├── authRoutes.js        # Rutas de autenticación
│   ├── booksRoutes.js       # Rutas de libros
│   └── adminRoutes.js       # Rutas de administración
├── views/
│   ├── layouts/
│   │   └── main.hbs         # Layout principal
│   ├── login.hbs            # Vista de login
│   ├── register.hbs         # Vista de registro
│   ├── home.hbs             # Página principal
│   ├── books.hbs            # Lista de libros
│   ├── admin.hbs            # Panel de administración
│   ├── addBook.hbs          # Agregar libro
│   └── editBook.hbs         # Editar libro
├── app.js                   # Aplicación principal
├── seed.js                  # Script de inicialización
├── package.json
└── .env                     # Variables de entorno
```

## 🔐 API Endpoints

### Autenticación
- `GET /login` - Mostrar formulario de login
- `POST /login` - Iniciar sesión
- `GET /register` - Mostrar formulario de registro
- `POST /register` - Registrar nuevo usuario
- `GET /logout` - Cerrar sesión

### Libros (requiere autenticación)
- `GET /libros` - Ver lista de libros disponibles
- `POST /libros/:id/comprar` - Comprar libro (body: `cantidad`)

### Administración (requiere rol admin)
- `GET /admin` - Panel de administración
- `GET /admin/books/new` - Formulario para agregar libro
- `POST /admin/books` - Crear nuevo libro
- `GET /admin/books/:id/edit` - Formulario para editar libro
- `POST /admin/books/:id/edit` - Actualizar libro
- `POST /admin/books/:id/delete` - Eliminar libro

## 🗄️ Modelos de Datos

### User
```javascript
{
  id: INTEGER,
  username: STRING (único),
  password: STRING (hasheado con bcrypt),
  role: STRING ('user' | 'admin'),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

### Book
```javascript
{
  id: INTEGER,
  nombre: STRING,
  cantidad_disponible: INTEGER,
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

## 🛡️ Seguridad

- ✅ Contraseñas hasheadas con **bcryptjs**
- ✅ Autenticación mediante **JWT** almacenado en cookies
- ✅ Sistema de roles para proteger rutas administrativas
- ✅ Validación de stock antes de permitir compras
- ✅ Middleware de autenticación en rutas protegidas

## 🎨 Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos

### Autenticación
- **JWT (jsonwebtoken)** - Tokens de autenticación
- **bcryptjs** - Hash de contraseñas
- **cookie-parser** - Manejo de cookies

### Frontend
- **Handlebars (express-handlebars)** - Motor de plantillas
- **Bootstrap 5** - Framework CSS

### Desarrollo
- **nodemon** - Hot reload en desarrollo
- **dotenv** - Gestión de variables de entorno

## 📝 Scripts Disponibles

```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start

# Inicializar/reiniciar base de datos
node seed.js
```

## ⚠️ Notas Importantes

1. **Seguridad en producción:**
   - Cambia el `JWT_SECRET` por uno generado aleatoriamente
   - Usa variables de entorno seguras
   - Implementa HTTPS
   - Configura CORS apropiadamente

2. **Reiniciar base de datos:**
   - El script `seed.js` usa `{ force: true }` que **BORRA** todas las tablas
   - Usa con precaución en producción

3. **Sistema de roles:**
   - Los usuarios normales NO pueden auto-asignarse el rol admin
   - Solo se puede crear admins mediante el seed o directamente en la BD

## 📄 Licencia

ISC

## 👨‍💻 Autor

**Eliu2001**

---

¿Problemas o sugerencias? Abre un issue en el repositorio.
