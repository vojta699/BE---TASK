import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('nemesis', (t) => {
    t.index(['character_id']);
  });
  await knex.schema.alterTable('secret', (t) => {
    t.index(['nemesis_id']);
  });
  await knex.schema.alterTable('character', (t) => {
    t.index(['gender']);
    t.index(['born']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('nemesis', (t) => t.dropIndex(['character_id']));
  await knex.schema.alterTable('secret', (t) => t.dropIndex(['nemesis_id']));
  await knex.schema.alterTable('character', (t) => {
    t.dropIndex(['gender']);
    t.dropIndex(['born']);
  });
}