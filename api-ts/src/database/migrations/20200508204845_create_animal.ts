import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('animal', (table) => {
    table.increments();
    table.string('picture').notNullable();
    table.string('name').notNullable();
    table.integer('age').notNullable();
    table.string('info').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.integer('status', 1).notNullable();

    table.integer('ownerId').notNullable();

    table.foreign('ownerId').references('id').inTable('owner');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('animal');
}

