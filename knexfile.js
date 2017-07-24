// Update with your config settings.
/*eslint-disable */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'database_development',
      user:     'root',
      password: '',
      host: '127.0.0.1'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
