const router = require("express").Router();

const bookController = require("../Controllers/bookController");

router.get("/book-index",bookController.GetAllBookIndex);
router.get("/book-mant",bookController.GetAllBookMant);
router.get("/book-deatil/:id",bookController.GetBookDetail);
router.get("/book-add",bookController.GetAddBook);
router.post("/book-add",bookController.PostAddBook);
router.get("/book-edit/:id",bookController.GetEditBook);
router.post("/book-edit",bookController.PostEditBook);
router.post("/book-delete",bookController.PostDeleteBook);

module.exports = router;