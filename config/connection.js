// Load environment variables from a .env file
require('dotenv').config();

const Sequelize = require('sequelize');

// Connect to database by passing a  connection URL or by passing the connection parameters from the .env file to the Sequelize constructor
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
