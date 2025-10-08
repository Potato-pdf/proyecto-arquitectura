# Frontend - Arquitectura y Estructura

## 📁 Estructura Modular

```
app/frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de login/registro
│   └── globals.css              # Estilos globales
├── components/                   # Componentes de UI (Solo diseño)
│   ├── ui/                      # Componentes base de shadcn/ui
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── auth-form.tsx            # Formulario de autenticación
│   └── artistic-background.tsx  # Fondo animado
├── lib/                          # Lógica de negocio (Sin UI)
│   ├── api/                     # Capa de comunicación HTTP
│   │   ├── config.ts            # Configuración de la API
│   │   └── auth.api.ts          # Cliente de autenticación
│   ├── hooks/                   # Custom hooks
│   │   └── useAuth.ts           # Hook de autenticación
│   ├── store/                   # Gestión de estado
│   │   └── token.storage.ts    # Almacenamiento del token
│   ├── types/                   # Definiciones de tipos
│   │   └── auth.types.ts        # Tipos de autenticación
│   ├── utils.ts                 # Utilidades generales
│   └── index.ts                 # Exportaciones centralizadas
├── .env.local                    # Variables de entorno local
├── .env.example                  # Ejemplo de variables de entorno
├── package.json
└── tsconfig.json
```

## 🎯 Principios de Arquitectura

### 1. **Separación de Responsabilidades**
- **Componentes (`components/`)**: Solo UI y diseño
- **Lógica de negocio (`lib/`)**: API, hooks, tipos, estado

### 2. **Módulos Pequeños y Enfocados**
Cada archivo tiene una única responsabilidad:
- `auth.types.ts` → Solo definiciones de tipos
- `auth.api.ts` → Solo comunicación HTTP
- `useAuth.ts` → Solo lógica de autenticación
- `token.storage.ts` → Solo gestión de tokens

### 3. **Capas Claramente Definidas**

```
┌─────────────────────────┐
│   UI Components         │ ← Solo diseño visual
├─────────────────────────┤
│   Custom Hooks          │ ← Lógica de UI
├─────────────────────────┤
│   API Client            │ ← Comunicación HTTP
├─────────────────────────┤
│   Storage / State       │ ← Persistencia
└─────────────────────────┘
```

## 🔧 Uso de los Módulos

### **1. Tipos de Datos (`lib/types/auth.types.ts`)**
```typescript
import type { User, LoginCredentials } from '@/lib/types/auth.types';
```

### **2. Cliente API (`lib/api/auth.api.ts`)**
```typescript
import { authApi } from '@/lib/api/auth.api';

// Login
const response = await authApi.login({ email, password });

// Registro
const response = await authApi.register({ email, password, name });
```

### **3. Hook de Autenticación (`lib/hooks/useAuth.ts`)**
```typescript
import { useAuth } from '@/lib/hooks/useAuth';

function MyComponent() {
  const { user, login, register, logout, loading, error } = useAuth();

  const handleLogin = async () => {
    await login({ email: 'user@example.com', password: '123456' });
  };

  return (
    <div>
      {user ? <p>Hola {user.name}</p> : <button onClick={handleLogin}>Login</button>}
    </div>
  );
}
```

### **4. Almacenamiento de Token (`lib/store/token.storage.ts`)**
```typescript
import { tokenStorage } from '@/lib/store/token.storage';

// Guardar token
tokenStorage.set('mi-token-jwt');

// Obtener token
const token = tokenStorage.get();

// Eliminar token
tokenStorage.remove();

// Verificar si existe
const hasToken = tokenStorage.exists();
```

## 🔐 Flujo de Autenticación

```
1. Usuario llena formulario
   ↓
2. Componente llama a useAuth.login()
   ↓
3. useAuth llama a authApi.login()
   ↓
4. authApi hace fetch al backend
   ↓
5. Backend responde con token + user
   ↓
6. Token se guarda en tokenStorage
   ↓
7. User se guarda en estado de useAuth
   ↓
8. UI se actualiza automáticamente
```

## 🚀 Configuración

### Variables de Entorno

Crea un archivo `.env.local` (ya existe):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Iniciar el Proyecto
```bash
cd app/frontend
yarn dev
```

## ✅ Ventajas de esta Arquitectura

1. **📦 Modular**: Cada archivo hace una cosa
2. **🔄 Reutilizable**: Los hooks y APIs pueden usarse en cualquier componente
3. **🧪 Testeable**: Fácil probar cada módulo por separado
4. **📖 Legible**: Código simple y directo
5. **🛠️ Mantenible**: Fácil encontrar y modificar código
6. **🎨 UI desacoplada**: El diseño no conoce la lógica de negocio

## 📝 Ejemplo Completo

```typescript
// components/mi-componente.tsx (UI)
'use client';

import { useAuth } from '@/lib/hooks/useAuth';

export function MiComponente() {
  const { user, login, loading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'test@test.com',
        password: '123456'
      });
      console.log('Login exitoso!');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {user ? (
        <p>Hola {user.name}</p>
      ) : (
        <button onClick={handleLogin}>Iniciar Sesión</button>
      )}
    </div>
  );
}
```

## 🎯 Reglas de Oro

1. **Componentes**: Solo UI, no lógica de negocio
2. **Hooks**: Reutilizables, una responsabilidad
3. **API**: Solo comunicación HTTP
4. **Types**: Compartidos en toda la app
5. **Storage**: Solo persistencia de datos

---

**¿Necesitas agregar más funcionalidad?**

1. Crea un nuevo archivo en `lib/`
2. Mantenlo pequeño y enfocado
3. Exportalo desde `lib/index.ts`
4. Úsalo en tus componentes

¡Simple y limpio! 🎉
