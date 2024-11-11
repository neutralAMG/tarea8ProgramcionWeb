const express = require("express");
const app = express();
const {engine} = require("express-handlebars");
const path = require("path");
const context = require("./context/ApplicationContext");
const ModelConfig = require("./utils/ModelsRelantionshipConfig")
const authorRoutes = require("./Routes/autorRoutes")
const bookRoutes = require("./Routes/bookRoutes")
const categoryRoutes = require("./Routes/categoryRoutes")
const editorialRoutes = require("./Routes/editorialRoutes")

// sets layouts
app.engine("hbs",engine({
    helpers:{
        equals: (v1,v2) => v1 === v2
    },
    layoutsDir: "Views/layouts",
    defaultLayout:"main-layout",
    extname: "hbs"
}));
//sets engine 
app.set("view engine","hbs");

//sets where the views are 
app.set("views", "views");

app.use(express.static(path.join(__dirname, "Public")));

app.use(express.urlencoded({extended: false}));
app.use("/book", bookRoutes);
app.use("/author", authorRoutes);
app.use("/category", categoryRoutes);
app.use("/editorial", editorialRoutes);

app.use(function(req, res, next){
    res.redirect("/book/book-index")
});

ModelConfig.config();

context.sync({/*alter: true*/}).then(() => {
    app.listen(8001)
}).catch((err) => {
    console.log(err)
});
