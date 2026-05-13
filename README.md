# skyRESERVE

Plataforma profesional de servicios de drone desarrollada con tecnología moderna para demostrar capacidades de desarrollo frontend, arquitectura de aplicaciones y experiencia de usuario.

## 🚀 Demo

**URL**: [skyreserve.es](https://skyreserve.es)

## 📋 Descripción del Proyecto

skyRESERVE es una aplicación web completa para la gestión de servicios de drone profesionales. El proyecto fue creado con el objetivo de展示了：

- **Desarrollo frontend moderno** con React 19 y TypeScript
- **Arquitectura de aplicaciones** escalables y mantenibles
- **Diseño de experiencia de usuario** profesional e intuitivo
- **Integración con servicios externos** (Supabase, Formspree)
- **Patrones de desarrollo** limpios y escalables

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Framework UI moderno
- **TypeScript** - Tipado estático para mayor seguridad
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS 4** - Framework de estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **React Router DOM** - Gestión de rutas
- **Zustand** - Gestión de estado global
- **React Icons** - Biblioteca de iconos

### Backend / Servicios
- **Supabase** - Base de datos, autenticación y backend como servicio
- **Formspree** - Gestión de formularios y emails

### Estándares de Código
- **ESLint** - Linting y calidad de código
- **TypeScript** - Tipado estricto
- **Vitest** - Testing unitario y de componentes

## 🧪 Testing

El proyecto incluye un suite de tests completo con **Vitest** cubriendo:

### Tests Implementados
- **Tipos** (`types.test.ts`) - Validación de interfaces DroneService y Booking
- **Stores** (`stores.test.ts`) - Tests de Zustand (authStore, themeStore)
- **Componentes UI** - ServiceCard, TimeGrid, Navbar, NotFound
- **Páginas** - Contact, Login, About

### Ejecutar Tests
```bash
# Modo watch (desarrollo)
npm run test

# Una sola ejecución
npm run test:run
```

### Cobertura
- 8 archivos de test
- 56 tests pasando
- Tests de componentes, stores, tipos y páginas

## 📁 Estructura del Proyecto

```
sky-reserve/
├── public/                    # Archivos estáticos públicos
│   ├── skyreservelogo.webp   # Logo de la aplicación
│   ├── hero_drone.mkv       # Video del hero
│   └── services/             # Imágenes de servicios
│
├── src/
│   ├── components/
│   │   ├── layout/          # Componentes de estructura
│   │   │   ├── Hero.tsx     # Sección hero con video
│   │   │   ├── Navbar.tsx   # Navegación responsive
│   │   │   └── ServiceGrid.tsx  # Grid de servicios
│   │   │
│   │   └── ui/              # Componentes de interfaz
│   │       ├── ServiceCard.tsx
│   │       ├── ServiceModal.tsx
│   │       └── TimeGrid.tsx
│   │
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Landing.tsx      # Página principal
│   │   ├── Services.tsx     # Catálogo de servicios
│   │   ├── ServiceDetail.tsx # Detalle de servicio
│   │   ├── Booking.tsx      # Sistema de reservas
│   │   ├── MyBookings.tsx   # Reservas del usuario
│   │   ├── Admin.tsx        # Panel de administración
│   │   ├── Contact.tsx      # Formulario de contacto
│   │   ├── About.tsx         # Página sobre el proyecto
│   │   ├── Login.tsx         # Autenticación
│   │   └── NotFound.tsx     # Página 404
│   │
│   ├── hooks/              # Custom hooks
│   │   ├── useServices.ts   # Gestión de servicios
│   │   ├── useAvailability.ts # Disponibilidad horaria
│   │   └── useAdminBookings.ts # Reservas del admin
│   │
│   ├── store/              # Estado global (Zustand)
│   │   ├── authStore.ts     # Autenticación y roles
│   │   └── themeStore.ts    # Tema claro/oscuro
│   │
│   ├── lib/                # Utilidades y configuración
│   │   └── supabase.ts      # Cliente de Supabase
│   │
│   ├── types/              # Definiciones de tipos
│   │   └── types.ts         # Interfaces TypeScript
│   │
│   ├── App.tsx             # Componente raíz y rutas
│   ├── main.tsx            # Punto de entrada
│   └── index.css            # Estilos globales y theme
│
├── .env                     # Variables de entorno (no incluir en git)
├── index.html              # Template HTML con SEO
├── package.json             # Dependencias del proyecto
├── tsconfig.json           # Configuración TypeScript
├── vite.config.ts          # Configuración de Vite
└── tailwind.config.ts      # Configuración de Tailwind
```

## 🎯 Características Principales

### 1. Sistema de Reservas
- Selección de servicio, fecha y hora
- Validación de disponibilidad en tiempo real
- Duración configurable del servicio
- Cálculo automático de precio
- Notificaciones de éxito/error

### 2. Gestión de Usuarios
- **Autenticación** con Supabase Auth
- **Roles**: Cliente / Administrador
- **Mis Reservas**: Seguimiento de reservas del usuario
- **Panel Admin**: Gestión completa de reservas

### 3. Catálogo de Servicios
- Listado de servicios desde base de datos
- Filtrado por categoría
- Búsqueda por nombre
- Detail page con información completa
- Diseño visual con animaciones

### 4. Formulario de Contacto
- Integración con Formspree
- Validación de campos
- Mensaje de confirmación
- Diseño responsive

### 5. Experiencia de Usuario
- **Diseño profesional** sin animaciones innecesarias
- **Tema claro/oscuro** persistido
- **Responsive** para todos los dispositivos
- **Animaciones sutiles** con Framer Motion
- **SEO optimizado** con meta tags

### 6. Panel de Administración
- Vista de todas las reservas
- Cambiar estado (pendiente/confirmado/cancelado)
- Eliminar reservas
- Notificaciones en tiempo real
- Información del cliente

## 🚀 Cómo Ejecutar el Proyecto

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   cd sky-reserve
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear archivo `.env` en la raíz:
   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
   VITE_FORMSPREE_KEY=tu_formspree_id
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   ```

## 🔧 Configuración de Supabase

### Tablas Necesarias

```sql
-- Servicios
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price_per_hour DECIMAL,
  category TEXT,
  image_url TEXT,
  available_from TEXT,
  available_until TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reservas
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  duration_hours INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Perfiles de usuario
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'client',
  avatar_url TEXT
);

-- Mensajes de contacto
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas RLS (seguridad)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Permisos completos para desarrollo
CREATE POLICY "full_access_bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "full_access_services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "full_access_profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "full_access_contact" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
```

### Hacer usuario administrador

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'tu_email@ejemplo.com');
```

## 🎨 Diseño del Sistema

### Colores
- **Primary**: `#790909` (Rojo / Brand accent)
- **Background**: `#ffffff` (Claro) / `#121212` (Oscuro)
- **Text Primary**: `#1d1d1f`
- **Text Secondary**: `#8b8b86`

### Tipografía
- **Familia**: Syne (Google Fonts)
- **Estilos**: Light, Regular, Bold, Italic

### Componentes UI
- Bordes sutiles (`border-text-primary/5`)
- Spacing generoso
- Tracking (letter-spacing) profesional
- Tamaños de texto consistentes

## 📱 Responsive Design

El proyecto está diseñado mobile-first con breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🔐 Seguridad

- Row Level Security (RLS) en Supabase
- Autenticación con JWT
- Políticas por rol (admin/client)
- Validación de datos en cliente y servidor

## 📈 Rendimiento

- Code splitting por rutas
- Lazy loading de imágenes
- Animaciones optimizadas con `will-change`
- Build optimizado con Vite

## 🤝 Contribuciones

Este proyecto es un portafolio personal. Sin embargo, sugerencias y mejoras son bienvenidas.

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

## 👤 Autor

**Rafa / Rdisquete**

- Portfolio: [rdisquete.es](https://rdisquete.es)
- LinkedIn: [linkedin.com/in/rdisquete](https://linkedin.com/in/rdisquete)
- GitHub: [github.com/rdisquete](https://github.com/rdisquete)

---

*Este proyecto fue desarrollado como demostración de habilidades de desarrollo frontend y arquitectura de aplicaciones web modernas.*