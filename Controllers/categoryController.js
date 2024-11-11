const category = require("../Models/category");
const book = require("../Models/book");
const categoryMantRoute = "/category/category-mant";


exports.GetAllCategoryMant = (req, res, next)=>{
    category.findAll().then((result) => {

        const categories = result.map((a) => a.dataValues);
   
        return res.render(getViewByLastPart("mant"),{
           categories: categories,
           IsEmpty: categories.length === 0
        });
   
       }).catch((err) => console.log(err));
};

exports.GetAddCategory = (req, res, next)=> res.render(getViewByLastPart("add"));

exports.PostAddCategory = (req, res, next)=>{
    const {name,description} = req.body;

    category.create({
        name,
        description
     }).then((result) => res.redirect(categoryMantRoute))
     .catch((err) => console.log(err));
};


exports.GetEditCategory = (req, res, next)=>{
    const id  = req.params.id;
    category.findByPk(id).then((result) => {
        if (result === null) return res.rendirect(categoryMantRoute);

        const categoryToEdit = result.dataValues;
        return res.render(getViewByLastPart("edit"),{
            category: categoryToEdit
        })
    }).catch((err) => console.log(err));
};


exports.PostEditCategory = (req, res, next)=>{
    const {id, name,description} = req.body;

    category.update({ 
        name,
        description
    },{where: {id:id}})
    .then((result) => res.redirect(categoryMantRoute))
    .catch((err) => console.log(err));
};


exports.PostDeleteCategory = (req, res, next)=>{
    const id = req.body.id;
    category.destroy({where:{id:id}})
    .then((result) => res.redirect(categoryMantRoute))
    .catch((err) => console.log(err));
};

const getViewByLastPart = (lastPart) => `categoryViews/category-${lastPart}`