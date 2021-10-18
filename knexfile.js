const sharedConfig = {
  client: 'pg',
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  }
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'antireaper',
      database: 'waterMyPlants07'
    }
  },
  testing: {
    ...sharedConfig,
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'antireaper',
      database: 'waterMyPlants07'
    }
  },
  production: {
    // figure out what to put here
  }
}