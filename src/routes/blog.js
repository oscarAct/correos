const express = require("express");
const blogController = require("../controllers/blogController");
const midAuth = require("../middlewares/auth");

const router = express.Router();

// rutas de blogs

router.get("/blogs/public", blogController.getPublic);
router.get("/blogs/private", blogController.getPrivateBlogs);
router.post("/blog/new", blogController.add);
router.put("/blog/update/:id", blogController.update);
router.put("/blog/switchState/:id", blogController.switchState);
router.delete("/blog/delete/:id", blogController.delete);

module.exports = router;
