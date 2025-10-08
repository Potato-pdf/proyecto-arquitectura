# API de Autenticación - Proyecto Arquitectura

## 🚀 Configuración Inicial

### 1. Instalar dependencias
```bash
cd app/backend/proyecto_arquitectura
yarn install
```

### 2. Configurar variables de entorno
Copia `.env.example` a `.env` y configura tus variables:
```bash
cp .env.example .env
```

### 3. Configurar PostgreSQL
Asegúrate de tener PostgreSQL instalado y crea la base de datos:
```sql
CREATE DATABASE proyecto_arquitectura;
```

### 4. Iniciar el servidor
```bash
yarn start:dev
```

## 📡 Endpoints de Autenticación

### Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "name": "Nombre Usuario"
}
```

**Respuesta exitosa (201):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-generado",
    "email": "usuario@ejemplo.com",
    "name": "Nombre Usuario",
    "rol": "user"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-generado",
    "email": "usuario@ejemplo.com",
    "name": "Nombre Usuario",
    "rol": "user"
  }
}
```

### Obtener Perfil (Protegido)
```http
GET /auth/profile
Authorization: Bearer <access_token>
```

**Respuesta exitosa (200):**
```json
{
  "id": "uuid-generado",
  "email": "usuario@ejemplo.com",
  "name": "Nombre Usuario",
  "rol": "user"
}
```

### Validar Token (Protegido)
```http
GET /auth/validate
Authorization: Bearer <access_token>
```

**Respuesta exitosa (200):**
```json
{
  "valid": true,
  "user": {
    "id": "uuid-generado",
    "email": "usuario@ejemplo.com",
    "name": "Nombre Usuario",
    "rol": "user"
  }
}
```

## 🛡️ Proteger Rutas con JWT

Para proteger cualquier ruta en tu aplicación, usa el `JwtAuthGuard`:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GetUser } from './auth/decorators/get-user.decorator';

@Controller('protected')
export class ProtectedController {
  
  @Get()
  @UseGuards(JwtAuthGuard)
  getProtectedData(@GetUser() user: any) {
    return {
      message: 'Datos protegidos',
      user: user,
    };
  }
}
```

## 📂 Estructura del Módulo de Autenticación

```
src/auth/
├── decorators/
│   └── get-user.decorator.ts    # Decorador para obtener el usuario del request
├── dto/
│   ├── login.dto.ts             # DTO para login
│   └── register.dto.ts          # DTO para registro
├── guards/
│   └── jwt-auth.guard.ts        # Guard para proteger rutas con JWT
├── strategies/
│   └── jwt.strategy.ts          # Estrategia de validación JWT
├── auth.controller.ts           # Controlador de endpoints
├── auth.module.ts               # Módulo de autenticación
└── auth.service.ts              # Lógica de negocio
```

## 🔐 Seguridad

- Las contraseñas se hashean con bcrypt (10 rounds)
- Los tokens JWT expiran en 24 horas
- Cambia `JWT_SECRET` en producción
- Desactiva `synchronize: true` en TypeORM para producción

## 🧪 Probar la API

Puedes usar herramientas como:
- **Postman**: Importa las rutas y prueba los endpoints
- **cURL**: Desde la terminal
- **Thunder Client**: Extensión de VSCode

Ejemplo con cURL:
```bash
# Registro
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Perfil (con token)
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

## ✅ Estado del Proyecto

- ✅ Módulo de Users completado
- ✅ Módulo de Auth completado
- ✅ JWT implementado
- ✅ Guards configurados
- ✅ Decoradores personalizados
- ✅ Registro de usuarios
- ✅ Login con validación
- ✅ Hash de contraseñas con bcrypt
- ✅ Protección de rutas
- ✅ TypeORM configurado
