import knex from 'knex';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

export default db;