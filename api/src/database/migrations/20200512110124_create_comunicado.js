exports.up = function (knex) {
  return knex.schema.createTable('communique', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.string('info').notNullable();

    table.integer('animalId').notNullable();

    table.foreign('animalId').references('id').inTable('animal');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('communique');
};
