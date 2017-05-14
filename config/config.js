const dotEnvPath = `.env.${process.env.NODE_ENV || 'development'}`;
require('dotenv').config({ path: dotEnvPath });

const REQUIRED_KEYS = [
  'DB_USERNAME',
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

const common = {
  postgres: {
    username: DB_USERNAME,
    password: DB_PASSWORD || null,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'postgres',
  },
};

function getEnvConfig(env) {
  switch (env) {
    case 'production':
      return {
        ...common,
        postgres: {
          ...common.posgres,
          dialectOptions: {
            ssl: true,
          },
        },
      };
    default:
      return common;
  }
}

export default getEnvConfig(process.env.NODE_ENV);
