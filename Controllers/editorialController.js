const editorial = require("../Models/editorial");
const book = require("../Models/book");
const editorialMantRoute = "/editorial/editorial-mant";

exports.GetAllEditorialMant = (req, res, next)=>{
    editorial.findAll().then((result) => {

        const editorials = result.map((a) => a.dataValues);
   
        return res.render(getViewByLastPart("mant"),{
            editorials: editorials,
           IsEmpty: editorials.length === 0
        });
   
       }).catch((err) => console.log(err));
};

exports.GetAddEditorial = (req, res, next) => res.render(getViewByLastPart("add"));

exports.PostAddEditorial = (req, res, next)=>{
    const {name,phone, country} = req.body;

    editorial.create({
        name,
        phone,
        country
     }).then((result) => res.redirect(editorialMantRoute))
     .catch((err) => console.log(err));

};


exports.GetEditEditorial = (req, res, next)=>{
    const id  = req.params.id;
    editorial.findByPk(id).then((result) => {
        if (result === null) return res.rendirect(editorialMantRoute);

        const editorialToEdit = result.dataValues;
        return res.render(getViewByLastPart("edit"),{
            editorial: editorialToEdit
        })
    }).catch((err) => console.log(err));
};


exports.PostEditEditorial = (req, res, next)=>{
    const {id, name, phone, country} = req.body;

    editorial.update({ 
        name,
        phone,
        country
    },{where: {id:id}})
    .then((result) => res.redirect(editorialMantRoute))
    .catch((err) => console.log(err));
};


exports.PostDeleteEditorial = (req, res, next)=>{
    const id = req.body.id;
    editorial.destroy({where:{id:id}})
    .then((result) => res.redirect(editorialMantRoute))
    .catch((err) => console.log(err));
};

const getViewByLastPart = (lastPart) => `editorialViews/editorial-${lastPart}`