import db from '../db/knex';

export const NemesisDAO = {
  async listAll() {
    return db('nemesis').select('*').orderBy('id');
  }
};