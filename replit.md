# Iberomundo Viajes

## Overview

Web oficial de Iberomundo Viajes — agencia de viajes española. Permite buscar vuelos reales a través de la API de Duffel, capturar leads con formulario emergente y conectar clientes por WhatsApp.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/iberomundo-viajes)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Flight search**: Duffel API
- **Validation**: Zod, drizzle-zod
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Features

- Buscador de vuelos real via Duffel API (Origen, Destino, Fechas, Pasajeros)
- Botón "SOLICITAR ESTA OFERTA" en cada vuelo
- Pop-up modal con aviso de tarifa y formulario de captura (Nombre + WhatsApp)
- Guarda leads en PostgreSQL
- Botón WhatsApp con vuelo pre-cargado en mensaje (número: 697797858)
- Botón flotante WhatsApp "¿Necesitas ayuda?"
- Página /admin para ver todos los leads

## Brand

- Azul Marino: #002366
- Dorado: #D4AF37
- Logo: public/logo.png (subir manualmente)

## Key Commands

- `pnpm run typecheck` — full typecheck
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Secrets Required

- `DUFFEL_ACCESS_TOKEN` — Token de acceso a la API de Duffel
- `SESSION_SECRET` — Secret de sesión
- `DATABASE_URL` — URL de PostgreSQL (auto-provisioned)
