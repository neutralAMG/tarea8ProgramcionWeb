const router = require("express").Router()
const editorialController = require("../Controllers/editorialController")


router.get("/editorial-mant",editorialController.GetAllEditorialMant);
router.get("/editorial-add",editorialController.GetAddEditorial);
router.post("/editorial-add",editorialController.PostAddEditorial);
router.get("/editorial-edit/:id",editorialController.GetEditEditorial);
router.post("/editorial-edit",editorialController.PostEditEditorial);
router.post("/editorial-delete",editorialController.PostDeleteEditorial);

module.exports = router;