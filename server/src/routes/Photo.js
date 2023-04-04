const { addPhoto, viewPhotos, deletePhoto } = require("../controllers/Photo");

const router = require("express").Router();

router.post("/add", addPhoto );
router.get("/view", viewPhotos);
router.post("/delete", deletePhoto);

module.exports = router;