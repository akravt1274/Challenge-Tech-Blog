// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import database connection from config.js
const sequelize = require('../config/connection');

// initialize Comment model (table) by extending off Sequelize's Model class
class Comment extends Model {}

// set up fields and rules for Comment model
Comment.init(
  {    
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,      
      primaryKey: true,
      autoIncrement: true
    },    
    content: {
      type: DataTypes.TEXT,
      allowNull: false     
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
        unique: false
      }
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'username',
        // unique: false
      }
    }
  },
  {
    sequelize,  // pass the connection instance
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
