const {DataTypes} = require("sequelize")
const connection = require("../context/ApplicationContext")

const Editorial = connection.define("Editorial",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    country:{
        type: DataTypes.STRING,
        allowNull: false
    },


},{tableName: "Editorial"})

module.exports = Editorial