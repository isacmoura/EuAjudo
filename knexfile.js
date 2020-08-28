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

  production: {
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
  }

};
