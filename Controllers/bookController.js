const author = require("../Models/autor");
const editorial = require("../Models/editorial");
const category = require("../Models/category");
const book = require("../Models/book");
const bookMantRoute = "/author/author-mant";

exports.GetAllBookMant = (req, res, next)=>{
    book.findAll({include: [{model: author, as: "Author"},{model: editorial, as: "Editorial"},{model: category, as: "Category"}]})
    .then((result) => {
        const books = result.map((a) => a.dataValues);
   
        return res.render(getViewByLastPart("mant"),{
            books: books,
           IsEmpty: books.length === 0
        });
   
       }).catch((err) => console.log(err));
};
exports.GetAllBookIndex = (req, res, next)=>{
    book.findAll({include: [{model: author, as: "Author"},{model: editorial, as: "Editorial"},{model: category, as: "Category"}]})
    .then((result) => {
        const books = result.map((a) => a.dataValues);
        return res.render(getViewByLastPart("index"),{
            books: books,
           IsEmpty: books.length === 0
        });
   
       }).catch((err) => console.log(err));
};

exports.GetBookDetail = (req, res, next)=>{
    const id = req.params.id;
    book.findOne({include: [{model: author, as: "Author"},{model: editorial, as: "Editorial"},{model: category, as: "Category"}], where:{id:id}})
    .then((result) => {

        const book = result.dataValues;
        return res.render(getViewByLastPart("detail"),{
            book: book,
        });
   
    }).catch((err) => console.log(err));
};


exports.GetAddBook = (req, res, next)=>{
    author.findAll().then((authors) => {
        if(authors.dataValues.length === 0) return res.redirect(bookMantRoute);
        editorial.findAll().then((editorials) => {
            if(authors.dataValues.length === 0) return res.redirect(bookMantRoute);
            category.findAll().then((categories) => {
                if(authors.dataValues.length === 0) return res.redirect(bookMantRoute);
                return res.render(getViewByLastPart("add"),{
                    authors: authors.map((a)=> a.dataValues),
                    editorials: editorials.map((e)=> e.dataValues),
                    categories: categories.map((c)=> c.dataValues)
                })
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
};

exports.PostAddBook = (req, res, next)=>{
    const {title, publicationYear, coverImg, categoryId, authorId, editorialId} = req.body;

    book.create({
        title,
        publicationYear,
        coverImg,
        categoryId,
        authorId,
        editorialId
    }).then((result) => res.redirect(bookMantRoute)).catch((err) => console.log(err));

};


exports.GetEditBook = (req, res, next)=>{
    const id = req.params.id;
    author.findAll().then((authors) => {
        if(authors.dataValues.length === 0) return res.redirect(bookMantRoute);
        editorial.findAll().then((editorials) => {
            if(authors.dataValues.length === 0) return res.redirect(bookMantRoute);
            category.findAll().then((categories) => {
                if(authors.dataValues.length === 0) return res.redirect(bookMantRoute);
                    book.findOne({include: [{model: author, as: "Author"},{model: editorial, as: "Editorial"},{model: category, as: "Category"}], where:{id:id}})
                    .then((result) => {
                      const book = result.dataValues;
                      return res.render(getViewByLastPart("edit"),{
                        book: book,
                        authors: authors.map((a)=> a.dataValues),
                        editorials: editorials.map((e)=> e.dataValues),
                        categories: categories.map((c)=> c.dataValues)
                    });}).catch((err) => console.log(err));
                 })
            .catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));

};


exports.PostEditBook = (req, res, next)=>{
    const {id, title, publicationYear, coverImg, categoryId, authorId, editorialId} = req.body;

    book.update({
        title,
        publicationYear,
        coverImg,
        categoryId,
        authorId,
        editorialId
    },{where:{id:id}})
    .then((result) => res.redirect(bookMantRoute))
    .catch((err) => console.log(err));
};


exports.PostDeleteBook = (req, res, next)=>{
    const id = req.body.id;
    book.destroy({where:{id:id}})
    .then((result) => res.redirect(bookMantRoute))
    .catch((err) => console.log(err));
};

const getViewByLastPart = (lastPart) => `bookViews/book-${lastPart}`