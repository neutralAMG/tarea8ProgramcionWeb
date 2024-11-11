const router = require("express").Router();

const categoryontroller = require("../Controllers/categoryController");


router.get("/category-mant",categoryontroller.GetAllCategoryMant);
router.get("/category-add",categoryontroller.GetAddCategory);
router.post("/category-add",categoryontroller.PostAddCategory);
router.get("/category-edit/:id",categoryontroller.GetEditCategory);
router.post("/category-edit",categoryontroller.PostEditCategory);
router.post("/category-delete",categoryontroller.PostDeleteCategory);

module.exports = router;