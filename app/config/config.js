const dotEnvPath = `.env.${process.env.NODE_ENV || 'development'}`;
require('dotenv').config({ path: dotEnvPath });

const REQUIRED_KEYS = [
  'DB_USERNAME',
  'DB_DATABASE',
  'DB_HOST',
  'SLACK_CLIENT_ID',
  'SLACK_CLIENT_SECRET',
  'SLACK_REDIRECT_URI',
];

REQUIRED_KEYS.forEach((key) => {
  if (!(key in process.env)) {
    throw new Error(`Missing required config key: ${key}`);
  }
});

const {
  PORT,

  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  // DB_SSL_ENABLED,

  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_REDIRECT_URI,
} = process.env;

module.exports = {
  port: PORT || 10010,
  slack: {
    clientId: SLACK_CLIENT_ID,
    clientSecret: SLACK_CLIENT_SECRET,
    redirectURI: SLACK_REDIRECT_URI,
  },
  [process.env.NODE_ENV || 'development']: {
    username: DB_USERNAME,
    password: DB_PASSWORD || null,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'postgres',
  },
};
