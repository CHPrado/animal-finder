import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('owner', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('phone').notNullable();
    table.string('password').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('owner');
}

