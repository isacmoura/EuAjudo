
exports.up = function(knex) {
  return knex.schema.createTable('users_cases', function(table) {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.integer('case_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.foreign('user_id').references('id').inTable('user');
    table.foreign('case_id').references('id').inTable('case');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_cases');
};
