# skyRESERVE

Plataforma de reservas para servicios profesionales de drones construida con React 19, TypeScript y Supabase.

---

## Overview

skyRESERVE es una aplicación web full frontend enfocada en la gestión de reservas de servicios de drones.

El proyecto fue planteado como una aplicación real, no como una demo aislada, buscando trabajar arquitectura frontend moderna, gestión de estado, autenticación, disponibilidad horaria y experiencia de usuario.

---

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Zustand
- Supabase
- Vitest

---

## Features

- Catálogo de servicios
- Sistema de reservas
- Gestión de disponibilidad
- Autenticación de usuarios
- Panel de administración
- Responsive design
- Dark / Light mode
- Testing
- Animaciones y microinteracciones

---

## Arquitectura

El proyecto está organizado por responsabilidades:

```bash
src/
├── components/
├── pages/
├── hooks/
├── store/
├── lib/
├── types/
└── test/
```

### Principales decisiones técnicas

- Zustand para estado global ligero y sin boilerplate
- Supabase como backend-as-a-service
- useEffect + hooks custom en lugar de React Query para mantener simplicidad y control total
- Tailwind v4 para diseño consistente y rápido
- Framer Motion para animaciones declarativas
- TypeScript estricto para mejorar mantenibilidad

---

## Autenticación

La autenticación está gestionada mediante Supabase Auth.

Incluye:

- login
- registro
- persistencia de sesión
- roles de usuario
- protección de rutas admin

---

## Testing

Testing realizado con:

- Vitest
- Testing Library
- jsdom

Incluye tests de:

- stores
- componentes
- páginas
- lógica de negocio

---

## Objetivo del proyecto

El objetivo principal de skyRESERVE era construir una aplicación frontend moderna con estructura y decisiones similares a un entorno profesional real.

Más allá del concepto de drones, el foco estaba en:

- arquitectura
- mantenibilidad
- UX
- tipado
- estado global
- integración con backend
- calidad de código

---

## Run locally

```bash
npm install
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Author

**Rafa — Frontend Developer**
