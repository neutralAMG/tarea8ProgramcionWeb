const author = require("../Models/autor");
const editorial = require("../Models/editorial");
const category = require("../Models/category");
const book = require("../Models/book");
const bookMantRoute = "/book/book-mant";
const transporter = require("../Service/EmailService")

exports.alert = (req, res, next)=>{
    return res.render("alert",{message: "You ether need to create a author or editorial or category, in order to create a book"})
}

exports.GetAllBookMant = (req, res, next)=>{
    book.findAll({include: [{model: author, as: "Author"},{model: editorial, as: "Editorial"},{model: category, as: "Category"}]})
    .then((result) => {
        const books = result.map((a) => a.dataValues);
        books.map((b) => b.publicationYear = b.publicationYear.toISOString().split("T")[0])
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
        books.map((b) => b.publicationYear = b.publicationYear.toISOString().split("T")[0])
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
        book.publicationYear = book.publicationYear.toISOString().split("T")[0]
        return res.render(getViewByLastPart("detail"),{
            book: book,
        });
   
    }).catch((err) => console.log(err));
};


exports.GetAddBook = (req, res, next)=>{
    author.findAll().then((authors) => {
        editorial.findAll().then((editorials) => {
            category.findAll().then((categories) => {
                if (!authors.length || !editorials.length || !categories.length) {
                   return res.redirect("/book/book-add-alert"); 
                }
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
    const {title, publicationYear, categoryId, authorId, editorialId} = req.body;
    const coverImgPath = req.file
    if (!coverImgPath) return res.redirect(bookMantRoute);
    book.create({
        title,
        publicationYear,
        coverImgPath: "/"+coverImgPath.path,
        categoryId,
        authorId,
        editorialId
    }).then((result) =>{
        res.redirect(bookMantRoute)

       return author.findByPk(authorId).then((a)=>{

           return transporter.sendMail({
            from:"Your book got publish",
            to: a.dataValues.email, 
            subject:"Your book "+ title +" got publish, congratulation",
            html:"Keep writing and improving as an author"
        },{})
        })
        
    } ).catch((err) => console.log(err));

};


exports.GetEditBook = (req, res, next)=>{
    const id = req.params.id;
    author.findAll().then((authors) => {
        editorial.findAll().then((editorials) => {
            category.findAll().then((categories) => {
                    book.findOne({include: [{model: author, as: "Author"},{model: editorial, as: "Editorial"},{model: category, as: "Category"}], where:{id:id}})
                    .then((result) => {
                      const book = result.dataValues;
                      book.publicationYear = book.publicationYear.toISOString().split("T")[0]
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
    const {id, title, publicationYear, categoryId, authorId, editorialId} = req.body;
    const coverImgPath = req.file
    book.findByPk(id)
    .then((bookLastState) => {
         const bookBeingUpdated =  bookLastState.dataValues;
         if(!bookBeingUpdated) return res.redirect(bookMantRoute)
         book.update({
             title,
             publicationYear,
             coverImgPath: coverImgPath ? "/" + coverImgPath.path : bookBeingUpdated.coverImgPath,
             categoryId,
             authorId,
             editorialId
         },{where:{id:id}})
      })
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