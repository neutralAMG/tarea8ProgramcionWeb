const {DataTypes} = require("sequelize")
const connection = require("../context/ApplicationContext")

const Book = connection.define( "Book",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    publicationYear:{
        type: DataTypes.DATE,
        allowNull: false
    },
    coverImgPath:{
        type: DataTypes.STRING,
        allowNull: true
    },
    categoryId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    authorId:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    editorialId:{
        type:DataTypes.INTEGER,
        allowNull: false,
    }


},{tableName: "Book"})

module.exports = Book