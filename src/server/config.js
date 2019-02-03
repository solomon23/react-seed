import sharedConfig from '../shared/config.js'

const config = {
  BASE: {
    DEBUG: false,
    DATABASE: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'postgres',
    },
  },

  TEST: {},

  PRODUCTION: {},

  BETA: {},

  DEVELOPMENT: {
    DATABASE: {
      username: 'user',
      password: null,
      database: 'data',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
  },
}

const ENV_CONFIG = { ...sharedConfig, ...config.BASE, ...config[sharedConfig.ENV] }
export default ENV_CONFIG
