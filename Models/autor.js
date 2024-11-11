const {DataTypes} = require("sequelize")
const connection = require("../context/ApplicationContext")

const Author = connection.define( "Author",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: null
    },

},{tableName: "Author"})

module.exports = Author