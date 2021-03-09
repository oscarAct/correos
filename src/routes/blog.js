const express = require("express");
const blogController = require("../controllers/blogController");
const midAuth = require("../middlewares/auth");

const router = express.Router();

// rutas de blogs

router.get("/blogs/public", blogController.getPublic);
router.get("/blog/public/:id", blogController.getbyIdPublic);
router.get(
  "/blog/private/:id",
  midAuth.authenticated,
  blogController.getbyIdPrivate
);
router.get(
  "/blogs/private",
  midAuth.authenticated,
  blogController.getPrivateBlogs
);
router.get("/blogs/recomended", blogController.getRecomended);
router.post("/blog/new", midAuth.authenticated, blogController.add);
router.put("/blog/update/:id", midAuth.authenticated, blogController.update);
router.put("/blog/addView/:id", blogController.addView);
router.put(
  "/blog/switchState/:id",
  midAuth.authenticated,
  blogController.switchState
);
router.delete("/blog/delete/:id", midAuth.authenticated, blogController.delete);

module.exports = router;
