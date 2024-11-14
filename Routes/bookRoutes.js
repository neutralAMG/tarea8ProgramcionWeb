const router = require("express").Router();

const bookController = require("../Controllers/bookController");

router.get("/book-index",bookController.GetAllBookIndex);
router.post("/book-filter-name",bookController.GetAllBookIndexFilterName);
router.post("/book-filter-categories",bookController.GetAllBookIndexFilterCategory);
router.get("/book-mant",bookController.GetAllBookMant);
router.get("/book-detail/:id",bookController.GetBookDetail);
router.get("/book-add",bookController.GetAddBook);
router.post("/book-add",bookController.PostAddBook);
router.get("/book-edit/:id",bookController.GetEditBook);
router.post("/book-edit",bookController.PostEditBook);
router.post("/book-delete",bookController.PostDeleteBook);

router.get("/book-add-alert",bookController.alert);
module.exports = router;