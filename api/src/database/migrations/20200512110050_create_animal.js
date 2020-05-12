exports.up = function (knex) {
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
};

exports.down = function (knex) {
  return knex.schema.dropTable('animal');
};

