const Blog = require("../models/blogModel");

const controller = {};

controller.add = (req, res) => {
  try {
    const { title, blogImg } = req.body;

    if (!title || !blogImg) {
      return res
        .status(202)
        .send({ status: false, message: "Missing required fields" });
    } else {
      const blog = new Blog();
      blog.title = title;
      blog.blogImg = blogImg;
      blog.body = "";

      blog.save((err, saved) => {
        if (err) {
          return res.status(202).send({
            status: false,
            error: err.mmessage,
          });
        } else {
          return res.status(201).send({
            status: true,
            blog: saved,
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};
controller.update = (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(202).send({
        status: false,
        message: "Missing required fields.",
      });
    } else {
      const update = {
        title,
        body,
      };
      Blog.findByIdAndUpdate({ _id: id }, update, (err, response) => {
        if (err) {
          return res.status(202).send({
            status: false,
            error: err.mmessage,
          });
        } else {
          return res.status(200).send({
            status: true,
            blog: response,
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};
controller.getPublic = (req, res) => {
  try {
    Blog.find({ deleted: false, active: true }, (err, response) => {
      if (err) {
        return res.status(202).send({
          status: false,
          error: err.mmessage,
        });
      } else {
        return res.status(200).send({
          status: true,
          blogs: response,
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};
controller.getPrivateBlogs = (req, res) => {
  try {
    Blog.find({ deleted: false }, (err, response) => {
      if (err) {
        return res.status(202).send({
          status: false,
          error: err.mmessage,
        });
      } else {
        return res.status(200).send({
          status: true,
          blogs: response,
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};
controller.switchState = (req, res) => {
  try {
    const { id } = req.params;

    Blog.findById({ _id: id }, (err, response) => {
      if (err) {
        return res.status(202).send({
          status: false,
          error: err.mmessage,
        });
      } else {
        if (response.active) {
          response.active = false;
          response.save((failed, saved) => {
            if (failed) {
              return res.status(202).send({
                status: false,
                error: failed.mmessage,
              });
            } else {
              return res.status(200).send({
                status: true,
                blog: saved,
              });
            }
          });
        } else {
          response.active = true;
          response.save((failed, saved) => {
            if (failed) {
              return res.status(202).send({
                status: false,
                error: failed.mmessage,
              });
            } else {
              return res.status(200).send({
                status: true,
                blog: saved,
              });
            }
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};
controller.delete = (req, res) => {
  try {
    const { id } = req.params;
    const update = {
      deleted: true,
    };
    Blog.findByIdAndUpdate({ _id: id }, update, (err, response) => {
      if (err) {
        return res.status(202).send({
          status: false,
          error: err.mmessage,
        });
      } else {
        return res.status(200).send({
          status: true,
          blog: response,
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};
module.exports = controller;
