
exports.up = function(knex) {
    return knex.schema.table('users_cases', function(table) {
        table.integer('case_id').notNullable();
        table.foreign('case_id').references('id').inTable('case');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users_cases');
};
