const Author = require("../Models/autor")
const Editorial = require("../Models/editorial")
const Category = require("../Models/category")
const Book = require("../Models/book")

exports.config = () =>{
    Author.hasMany(Book,{foreignKey:"authorId", onDelete:"Cascade", hooks: true})
Book.belongsTo(Author, {as:"Author", foreignKey:"authorId"})

Editorial.hasMany(Book,{foreignKey: "editorialId", onDelete:"Cascade", hooks: true})
Book.belongsTo(Editorial,{as:"Editorial", foreignKey:"editorialId"})

Category.hasMany(Book,{foreignKey: "categoryId", onDelete:"Cascade", hooks: true})
Book.belongsTo(Category,{as:"Category", foreignKey:"categoryId"})
}

