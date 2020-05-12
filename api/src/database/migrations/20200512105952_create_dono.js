exports.up = function (knex) {
  return knex.schema.createTable('owner', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('phone').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('owner');
};
