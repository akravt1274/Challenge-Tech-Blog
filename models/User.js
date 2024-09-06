const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// initialize User model (table) by extending off Sequelize's Model class
class User extends Model {}

// set up fields and rules for User model
User.init(
  {    
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,      
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [8],
      // },
    }
  },
  {
    sequelize,  // pass the connection instance
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
