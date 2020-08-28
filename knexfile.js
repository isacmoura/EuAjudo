// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host:     process.env.DATABASE_URL,
      database: process.env.DATABASE,
      user:     process.env.USER,
      password: process.env.PASSWORD
    },
    migrations: {
      directory: `${__dirname}/src/db/migrations`
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
