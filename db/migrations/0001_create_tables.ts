import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('character', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.enu('gender', ['female', 'male', 'other'], { useNative: true, enumName: 'gender' }).notNullable();
    t.string('ability');
    t.decimal('minimal_distance', 20, 10);
    t.decimal('weight', 10, 2);
    t.date('born').notNullable();
    t.timestamp('in_space_since');
    t.integer('beer_consumption');
    t.boolean('knows_the_answer');
  });

  await knex.schema.createTable('nemesis', (t) => {
    t.increments('id').primary();
    t.integer('character_id').notNullable().references('id').inTable('character').onDelete('CASCADE');
    t.string('name');
    t.enu('gender', ['female', 'male', 'other'], { useNative: true, enumName: 'gender' });
    t.date('born');
    t.boolean('is_alive').notNullable().defaultTo(true);
  });

  await knex.schema.createTable('secret', (t) => {
    t.increments('id').primary();
    t.integer('nemesis_id').notNullable().references('id').inTable('nemesis').onDelete('CASCADE');
    t.bigInteger('secret_code').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('secret');
  await knex.schema.dropTableIfExists('nemesis');
  await knex.schema.dropTableIfExists('character');
  await knex.raw('DROP TYPE IF EXISTS gender');
}