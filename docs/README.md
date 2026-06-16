# MiniBlog API

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar autores y publicaciones.

## Tecnologías

* Node.js
* Express
* PostgreSQL
* pg
* dotenv

---

## Base URL

http://localhost:3000

---

# Authors

## Obtener todos los autores

### Request

GET /authors

### Response

Status: 200 OK

```json
[
  {
    "id": 1,
    "name": "Valentin",
    "email": "valentin@test.com",
    "bio": "Desarrollador Backend"
  }
]
```

---

## Obtener autor por ID

### Request

GET /authors/:id

Ejemplo:

GET /authors/1

### Response

Status: 200 OK

```json
{
  "id": 1,
  "name": "Valentin",
  "email": "valentin@test.com",
  "bio": "Desarrollador Backend"
}
{
    "id": 2,
    "name": "Fran",
    "email": "Fran@test.com",
    "bio": "Detective privado",
    "created_at": "2026-06-16T13:57:05.449Z"
  }
```

### Autor inexistente

Status: 404 Not Found

```json
{
  "error": "Autor no encontrado"
}
```

---

# Códigos HTTP utilizados

| Código | Descripción                |
| ------ | -------------------------- |
| 200    | Operación exitosa          |
| 201    | Recurso creado             |
| 204    | Recurso eliminado          |
| 400    | Datos inválidos            |
| 404    | Recurso no encontrado      |
| 500    | Error interno del servidor |

```
```
