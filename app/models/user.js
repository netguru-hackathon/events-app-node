import { DataTypes } from 'sequelize';

import sequelize from './sequelize';

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  slack_id: DataTypes.STRING,
  token: DataTypes.STRING,
});

export default User;
