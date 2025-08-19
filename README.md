# Characters API (Express + Postgres + Knex)

## REST API that exposes:

- `GET /api/characters` – returns ten characters with nested nemeses and their secrets (tree structure), also querry params can be provided to edit number of result (max 10 result per page) `GET /api/characters?page=1&pageSize=5`
- `GET /api/stats` – returns statistics JSON: characters_count, average_age (characters+nemeses), average_weight, genders
- `GET /api/health` – health check

## Getting started

1. Copy `.env.example` to `.env` and set `DATABASE_URL` (Postgres URL). For copying you can use script: `npm run setup:env`
2. Install deps: `npm i`
3. Start dev server: `npm run dev`
4. To run tests: `npm run test` or `npm run test:coverage`

## App structure

characters-api/
├─ .env.example
├─ package.json
├─ tsconfig.json
├─ knexfile.ts
├─ README.md
├─ src/
│  ├─ app.ts
│  ├─ server.ts
│  ├─ config/
│  ├─ utils/
│  ├─ db/
│  ├─ types/
│  ├─ models/
│  ├─ dao/
│  ├─ services/
│  ├─ controllers/
│  ├─ routes/
│  └─ middleware/
└─ tests/

## Notes
- DAO/Service/Controller layering keeps concerns separate and testable.
