const author = require("../Models/autor");
const book = require("../Models/book");
const authorMantRoute = "/author/author-mant";

exports.GetAllAuthorsMant = (req, res, next)=>{
    author.findAll().then( async (result) => {

     const authors = result.map((a) => a.dataValues);
     await Promise.all(authors.map(async (a) =>{
        const result =  await book.findAndCountAll({where:{authorId:a.id}})
         a.bookCount = result.count
         return a;
     }))  

     return res.render(getViewByLastPart("mant"),{
        authors: authors,
        IsEmpty: authors.length === 0
     });

    }).catch((err) => console.log(err));
};

exports.GetAddAuthor = (req, res, next) => res.render(getViewByLastPart("add"))

exports.PostAddAuthor = (req, res, next)=>{
    const {name,email} = req.body;

    author.create({
        name,
        email
     }).then((result) => res.redirect(authorMantRoute))
     .catch((err) => console.log(err));

};


exports.GetEditAuthor = (req, res, next)=>{
    const id  = req.params.id;
    author.findByPk(id).then((result) => {
        if (result === null) return res.rendirect(authorMantRoute);

        const authorToEdit = result.dataValues;
        return res.render(getViewByLastPart("edit"),{
            author: authorToEdit
        })
    }).catch((err) => console.log(err));
};


exports.PostEditAuthor = (req, res, next)=>{
    const {id, name,email} = req.body;

    author.update({ 
        name,
        email
    },{where: {id:id}})
    .then((result) => res.redirect(authorMantRoute))
    .catch((err) => console.log(err));

};


exports.PostDeleteAuthor = (req, res, next)=>{
    const id = req.body.id;
    author.destroy({where:{id:id}})
    .then((result) => res.redirect(authorMantRoute))
    .catch((err) => console.log(err));
};

const getViewByLastPart = (lastPart) => `authorViews/author-${lastPart}`