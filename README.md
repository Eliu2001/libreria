# 📚 Sistema de Librería

Sistema completo de gestión de librería con e-commerce, autenticación JWT, control de inventario y panel administrativo.

---

## 📋 Documentación del Proyecto

### 🎯 Problema Resuelto

Este proyecto aborda la necesidad de **digitalizar y automatizar la gestión de una librería**, proporcionando una plataforma web integral que permite:

- **Para usuarios finales:**
  - Navegar un catálogo de libros con búsqueda y filtrado por categorías
  - Agregar productos a un carrito de compras
  - Realizar pedidos con validación de stock en tiempo real
  - Consultar el historial de compras

- **Para administradores:**
  - Gestionar inventario completo (CRUD de libros y categorías)
  - Monitorear ventas mediante un dashboard con estadísticas visuales
  - Administrar el estado de pedidos (pendiente, completado, cancelado)
  - Controlar precios y stock de productos

El sistema resuelve problemas comunes de gestión manual como errores en inventario, falta de trazabilidad de ventas y dificultad para analizar métricas de negocio.

---

### 🛠️ Tecnologías Utilizadas

#### **Backend**
- **Node.js v22.16.0** - Runtime de JavaScript del lado del servidor
- **Express.js v5.1.0** - Framework web minimalista y flexible
- **Sequelize v6.37.7** - ORM para modelado y consultas a PostgreSQL
- **PostgreSQL** - Sistema de base de datos relacional robusto

#### **Autenticación y Seguridad**
- **jsonwebtoken** - Generación y verificación de tokens JWT
- **bcryptjs** - Hashing de contraseñas con salts
- **cookie-parser** - Manejo seguro de cookies HTTP-only

#### **Frontend**
- **Handlebars (express-handlebars v8.0.3)** - Motor de plantillas del lado del servidor
- **Bootstrap 5.3.0** - Framework CSS responsive
- **Chart.js v4.4.0** - Librería de gráficos para visualización de datos

#### **Desarrollo**
- **ES6 Modules** - Sistema de módulos moderno de JavaScript
- **nodemon** - Auto-reinicio del servidor en desarrollo
- **dotenv** - Gestión de variables de entorno

---

### 🏗️ Enfoque de Desarrollo

El proyecto sigue una **arquitectura MVC (Modelo-Vista-Controlador)** con las siguientes prácticas:

#### **1. Arquitectura y Organización**
- **Separación de responsabilidades:** Modelos, controladores, rutas y vistas en directorios independientes
- **Relaciones de base de datos:** Uso de asociaciones Sequelize (hasMany, belongsTo, belongsToMany)
- **Configuración centralizada:** Variables de entorno y configuración de base de datos separadas

#### **2. Seguridad**
- **Autenticación basada en JWT:** Tokens almacenados en cookies HTTP-only
- **Control de acceso basado en roles:** Middleware para proteger rutas administrativas
- **Hashing de contraseñas:** Uso de bcrypt con salts para almacenamiento seguro
- **Validación de datos:** Verificación de stock antes de procesar compras

#### **3. Funcionalidades Implementadas (5 Features Principales)**

**Feature #1 - Sistema de Carrito:**
- Agregar, actualizar y eliminar productos del carrito
- Contador dinámico en navbar
- Proceso de checkout con transacciones de base de datos

**Feature #2 - Gestión de Precios y Pedidos:**
- Modelo de órdenes con estados (pendiente, completado, cancelado)
- Items de orden para tracking de productos comprados
- Panel administrativo para gestión de pedidos

**Feature #3 - Dashboard Administrativo:**
- Estadísticas de ventas: total vendido, productos vendidos, órdenes completadas
- Gráficos visuales con Chart.js (ventas por mes, libro más vendido)
- Consultas SQL optimizadas con GROUP BY y JOINs

**Feature #4 - Sistema de Búsqueda:**
- Búsqueda por nombre o autor con operadores ILIKE
- Contador de resultados encontrados
- Integración con filtros de categoría

**Feature #5 - Sistema de Categorías:**
- Relación muchos a muchos (Book ↔ Category)
- CRUD completo de categorías
- Filtrado de catálogo por categoría
- Asignación múltiple de categorías por libro

#### **4. Desarrollo Iterativo**
- Implementación secuencial de features con testing entre cada etapa
- Debugging sistemático de errores de Sequelize y PostgreSQL
- Seed data para facilitar desarrollo y testing

#### **5. Manejo de Errores**
- Control de errores en controladores con try-catch
- Validaciones de stock y permisos
- Mensajes informativos al usuario

---

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
