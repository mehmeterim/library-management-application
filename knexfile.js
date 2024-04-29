// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "library",
      user: "postgres",
      password: "123",
    },
  },

  staging: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "library",
      user: "postgres",
      password: "123",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "library",
      user: "postgres",
      password: "123",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
