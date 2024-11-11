const router = require("express").Router();

const authorController = require("../Controllers/autorController");


router.get("/author-mant",authorController.GetAllAuthorsMant);
router.get("/author-add",authorController.GetAddAuthor);
router.post("/author-add",authorController.PostAddAuthor);
router.get("/author-edit/:id",authorController.GetEditAuthor);
router.post("/author-edit",authorController.PostEditAuthor);
router.post("/author-delete",authorController.PostDeleteAuthor);

module.exports = router;