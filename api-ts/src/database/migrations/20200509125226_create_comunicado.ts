import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('communique', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.string('info').notNullable();

    table.integer('animalId').notNullable();

    table.foreign('animalId').references('id').inTable('animal');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('communique');
}

