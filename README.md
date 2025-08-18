# Characters API (Express + Postgres + Knex)

REST API that exposes:

- `GET /api/characters` – returns characters with nested nemeses and their secrets (tree structure)
- `GET /api/stats` – returns statistics JSON: characters_count, average_age (characters+nemeses), average_weight, genders
- `GET /api/health` – health check

## Getting started

1. Copy `.env.example` to `.env` and set `DATABASE_URL` (Postgres URL). For copying you can use script: `npm run setup:env`
2. Install deps: `npm i`
3. Run migrations: `npm run migrate:latest`
4. Seed sample data: `npm run seed`
5. Start dev server: `npm run dev`
6. To run tests: `npm run test`

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
└─ db/
   ├─ migrations/
   └─ seeds/

## Notes
- DB constraints and indexes are provided.
- DAO/Service/Controller layering keeps concerns separate and testable.
