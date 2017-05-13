'use_strict'

const dotEnvPath = `.env.${process.env.NODE_ENV || 'development'}`;
require('dotenv').config({ path: dotEnvPath });

const REQUIRED_KEYS = [
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_DATABASE',
  'DB_HOST',
];

REQUIRED_KEYS.forEach((key) => {
  if (!(key in process.env)) {
    throw new Error(`Missing required config key: ${key}`);
  }
});

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
} = process.env;

module.exports = {

  // Sequelize config, sourced based on current NODE_ENV from models/index.js file
  [process.env.NODE_ENV || 'development']: {
    username: DB_USERNAME,
    password: DB_PASSWORD || null,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'postgres',
    "dialectOptions": {
      "ssl": true
    }
  },
};
