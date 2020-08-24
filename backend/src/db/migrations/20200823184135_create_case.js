
exports.up = function(knex) {
    return knex.schema.createTable('case', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('org_id').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('org_id').references('id').inTable('organization');
    });
};

exports.down = function(knex) {
  
};
