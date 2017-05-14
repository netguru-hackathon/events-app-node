import Sequelize from 'sequelize';
import config from '../config/config';

const { database, username, password } = config.postgres;

export default new Sequelize(database, username, password, config.postgres);
