# Proyecto Arquitectura de Software

Sistema full-stack con autenticación JWT desarrollado con NestJS, Next.js y PostgreSQL.

## 🏗️ Arquitectura

- **Frontend**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **Backend**: NestJS + TypeScript + TypeORM
- **Database**: PostgreSQL 15
- **Auth**: JWT + Passport

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ y Yarn
- Docker y Docker Compose
- Git

### Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Potato-pdf/proyecto-arquitectura.git
   cd proyecto-arquitectura
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env según sea necesario
   ```

3. **Iniciar el proyecto (Automático)**
   ```powershell
   .\start-project.ps1
   ```

   O manualmente:

   ```bash
   # 1. Iniciar base de datos
   docker-compose up -d

   # 2. Iniciar backend (terminal 1)
   cd app/backend/proyecto_arquitectura
   yarn install
   yarn start:dev

   # 3. Iniciar frontend (terminal 2)
   cd app/frontend
   yarn install
   yarn dev
   ```

## 🌐 Acceso a Servicios

- **Frontend**: <http://localhost:3001>
- **Backend API**: <http://localhost:3000/deno>
- **PostgreSQL**: `localhost:5433`

## 📚 Documentación

- [Guía de Docker](DOCKER_GUIDE.md) - Comandos Docker útiles
- [Configuración de Entorno](ENV_CONFIG.md) - Variables de entorno centralizadas
- [Autenticación](app/backend/proyecto_arquitectura/AUTH_README.md) - Sistema de autenticación

## 🗂️ Estructura del Proyecto

```text
proyecto-arquitectura/
├── .env                          # Configuración centralizada
├── docker-compose.yml            # PostgreSQL container
├── start-project.ps1             # Script de inicio automático
├── app/
│   ├── backend/
│   │   └── proyecto_arquitectura/
│   │       ├── src/
│   │       │   ├── auth/         # Módulo de autenticación
│   │       │   ├── users/        # Módulo de usuarios
│   │       │   └── main.ts       # Entry point
│   │       └── package.json
│   └── frontend/
│       ├── app/                  # Next.js App Router
│       ├── components/           # Componentes React
│       ├── lib/                  # Utilidades y APIs
│       └── package.json
```

## 🔒 Seguridad

- JWT con tokens de 24 horas
- Contraseñas hasheadas con bcrypt
- CORS configurado
- Variables sensibles en `.env` (no versionado)

## 🛠️ Desarrollo

### Backend

```bash
cd app/backend/proyecto_arquitectura
yarn start:dev          # Modo desarrollo
yarn build              # Build producción
yarn test               # Tests
```

### Frontend

```bash
cd app/frontend
yarn dev                # Modo desarrollo
yarn build              # Build producción
yarn start              # Producción local
```

## 🐳 Docker

```bash
docker-compose up -d              # Iniciar PostgreSQL
docker-compose down               # Detener
docker-compose down -v            # Detener y borrar datos
docker-compose logs -f postgres   # Ver logs
```

## 📝 Variables de Entorno

Todas las variables están centralizadas en `.env` de la raíz:

```env
# Database
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=proyecto_arquitectura

# Backend
BACKEND_PORT=3000
JWT_SECRET=your-secret-key
NODE_ENV=development

# Frontend
FRONTEND_PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3000/deno
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece a los desarrolladores originales.

## 👥 Autores

- **Potato-pdf** - [GitHub](https://github.com/Potato-pdf)

