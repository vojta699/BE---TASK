import db from '../db/knex';

export const SecretDAO = {
  async listAll() {
    return db('secret').select('*').orderBy('id');
  }
};