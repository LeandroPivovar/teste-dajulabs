import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const sequelizeConfig = require(path.resolve(__dirname, './database.json'))[env];

const sequelize = new Sequelize({
  dialect: sequelizeConfig.dialect,
  storage: sequelizeConfig.storage,
  logging: false,
});

export default sequelize;