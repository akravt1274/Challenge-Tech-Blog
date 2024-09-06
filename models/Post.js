const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// initialize Post model (table) by extending off Sequelize's Model class
class Post extends Model {}

// set up fields and rules for Post model
Post.init(
  {    
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,      
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false     
    },
    content: {
      type: DataTypes.TEXT,
    },    
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        // unique: false
      }
    },
  },
  {
    sequelize,  // pass the connection instance
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
