
exports.up = function(knex) {
  return knex.schema.createTable('organization', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('responsible').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('phone');
      table.string('address').notNullable();
      table.integer('number').notNullable();
      table.string('complement');
      table.string('zipcode');
      table.string('neighborhood').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
      table.string('cnpj').unique();
      table.string('type').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('organization');
};
