# MiniBlog API

API REST construida con Node.js, Express y PostgreSQL para manejar autores y publicaciones en un blog.

## 🚀 Descripción

Esta API permite gestionar:

- Autores (`/authors`)
- Publicaciones (`/posts`)
- Consultar publicaciones de un autor específico

Está pensada para un proyecto integrador y utiliza `pg` para conectarse a PostgreSQL.

## Despliegue en Railway

Dato:
El despliegue de la API en fue realizado en render: https://proyectom2-1.onrender.com/

Sigue estos pasos para publicar la API en Railway:

1. Sube este repositorio a GitHub.
2. Crea un nuevo proyecto en Railway y conéctalo al repositorio.
3. Agrega un servicio de PostgreSQL desde Railway.
4. En el servicio de la API, ve a Variables y define estas variables de entorno:

```env
PORT=$PORT
NODE_ENV=production
DB_HOST=host_del_postgres
DB_PORT=5432
DB_NAME=nombre_de_la_base
DB_USER=usuario
DB_PASSWORD=contraseña
DB_URL=postgresql://usuario:contraseña@host:5432/nombre_de_la_base
```

> Railway también puede inyectar `DATABASE_URL`; si tu proyecto lo soporta, puedes usar esa variable en lugar de `DB_URL`.

5. En la sección Deploy, define el comando de inicio:

```bash
npm start
```

6. Ejecuta el script SQL de creación de tablas en la base de datos de Railway:

```bash
psql < db/schema.sql
```

7. Una vez desplegado, Railway te dará una URL pública del tipo:

```text
https://<nombre-del-servicio>.up.railway.app
```

- URL pública: se usa para consumir la API desde fuera de Railway.
- URL interna: se usa para comunicación privada entre servicios dentro de Railway.


## 🧩 Tecnologías

- Node.js
- Express
- PostgreSQL
- `pg`
- `dotenv`
- `vitest`
- `supertest`

## 📦 Requisitos previos

- Node.js instalado
- PostgreSQL instalado y accesible
- Base de datos creada con las tablas definidas en `db/schema.sql`

## ⚙️ Configuración

1. Copia el archivo de ejemplo de variables de entorno:

```bash
cp .env.example .env
```

2. Actualiza las variables de entorno en `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
PORT=3000
```

3. Asegúrate de que PostgreSQL esté ejecutándose y la base de datos esté disponible.

## ▶️ Ejecutar la aplicación

```bash
npm install
npm start
```

La API se inicia en `http://localhost:3000` por defecto.

## 🧪 Ejecutar tests

```bash
npm test
```

## 🗄️ Esquema de la base de datos

Las tablas principales del proyecto son:

### `authors`

- `id` (SERIAL, PK)
- `name` (VARCHAR(100), NOT NULL)
- `email` (VARCHAR(150), UNIQUE, NOT NULL)
- `bio` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### `posts`

- `id` (SERIAL, PK)
- `author_id` (INTEGER, NOT NULL, FK -> `authors.id`)
- `title` (VARCHAR(200), NOT NULL)
- `content` (TEXT, NOT NULL)
- `published` (BOOLEAN, DEFAULT false)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

## 🌐 Endpoints

### Autores

- `GET /authors` — Obtener todos los autores
- `GET /authors/:id` — Obtener autor por ID
- `POST /authors` — Crear un autor
- `PUT /authors/:id` — Actualizar un autor
- `DELETE /authors/:id` — Eliminar un autor

### Publicaciones

- `GET /posts` — Obtener todas las publicaciones
- `GET /posts/:id` — Obtener publicación por ID
- `GET /posts/author/:authorId` — Obtener publicaciones de un autor
- `POST /posts` — Crear una publicación
- `PUT /posts/:id` — Actualizar una publicación
- `DELETE /posts/:id` — Eliminar una publicación

## 📥 Ejemplos de uso

### Crear autor

```http
POST /authors
Content-Type: application/json

{
  "name": "Valentin",
  "email": "valentin@test.com",
  "bio": "Desarrollador Backend"
}
```

### Crear publicación

```http
POST /posts
Content-Type: application/json

{
  "author_id": 1,
  "title": "Primer post",
  "content": "Contenido de la publicación",
  "published": true
}
```

### Obtener publicaciones por autor

```http
GET /posts/author/1
```

## ✅ Respuestas comunes

### Éxitos

- `200 OK` — Consulta, actualización o eliminación exitosa
- `201 Created` — Recurso creado correctamente

### Errores

- `400 Bad Request` — Datos inválidos o faltantes
- `404 Not Found` — Recurso no encontrado
- `500 Internal Server Error` — Error del servidor

## 🤖 Registro de uso de IA

Este proyecto fue apoyado con herramientas de IA para generar y revisar estructura de código, documentación y pruebas iniciales.

## �📌 Notas

- El campo `author_id` es obligatorio para crear o actualizar publicaciones.
- `name` y `email` son obligatorios para crear un autor.
- La relación entre `posts` y `authors` está definida con `ON DELETE CASCADE`, lo que elimina publicaciones al borrar el autor.
