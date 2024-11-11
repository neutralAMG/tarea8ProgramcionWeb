const {DataTypes} = require("sequelize")
const connection = require("../context/ApplicationContext")

const Category = connection.define("Category",{
  id:{
    type:DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description:{
    type: DataTypes.STRING,
    allowNull: false
  }
},{tableName:"Category"})

module.exports = Category