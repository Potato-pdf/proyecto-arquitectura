# Docker Commands - Proyecto Arquitectura

## ⚙️ Configuración Inicial

Antes de iniciar el proyecto, asegúrate de tener el archivo `.env` configurado:

```bash
# Si no existe, copia el archivo de ejemplo
cp .env.example .env
```

**Nota:** Todas las variables de entorno están centralizadas en el archivo `.env` de la raíz. Ver `ENV_CONFIG.md` para más detalles.

## 🐳 Comandos Docker para la Base de Datos

### Iniciar la base de datos
```bash
docker-compose up -d
```

### Ver logs de la base de datos
```bash
docker-compose logs -f postgres
```

### Detener la base de datos
```bash
docker-compose down
```

### Detener y eliminar volúmenes (resetear DB)
```bash
docker-compose down -v
```

### Verificar que está corriendo
```bash
docker-compose ps
```

### Conectarse a PostgreSQL dentro del contenedor
```bash
docker exec -it proyecto-arquitectura-db psql -U postgres -d proyecto_arquitectura
```

## 🚀 Iniciar todo el proyecto

### 1. Iniciar la base de datos
```bash
docker-compose up -d
```

### 2. Iniciar el backend (en otra terminal)
```bash
cd app/backend/proyecto_arquitectura
yarn start:dev
```

### 3. Iniciar el frontend (en otra terminal)
```bash
cd app/frontend
yarn dev
```

## 📊 Acceder a los servicios

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432
  - Usuario: postgres
  - Contraseña: postgres
  - Base de datos: proyecto_arquitectura

## 🔧 Troubleshooting

### Si el puerto 5432 está ocupado
Edita el `docker-compose.yml` y cambia el puerto:
```yaml
ports:
  - "5433:5432"  # Usa 5433 en vez de 5432
```

Luego actualiza el `.env` del backend:
```
DB_PORT=5433
```
