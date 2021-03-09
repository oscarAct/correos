const Blog = require("../models/blogModel");

const controller = {};

controller.add = (req, res) => {
  try {
    const { title, blogImg, description } = req.body;

    if (!title || !blogImg || !description) {
      return res
        .status(202)
        .send({ status: false, message: "Missing required fields" });
    } else {
      const blog = new Blog();
      blog.title = title;
      blog.blogImg = blogImg;
      blog.body = "";
      blog.text = "";
      blog.description = description;
      blog.author = req.user.id;

      blog.save((err, saved) => {
        if (err) {
          return res.status(202).send({
            status: false,
            error: err.message,
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
    const { title, body, text, description } = req.body;

    if (!title || !body || !text || !description) {
      return res.status(202).send({
        status: false,
        message: "Missing required fields.",
      });
    } else {
      const update = {
        title,
        body,
        text,
        description,
      };
      Blog.findByIdAndUpdate({ _id: id }, update, (err, response) => {
        if (err) {
          return res.status(202).send({
            status: false,
            error: err.message,
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
controller.addView = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(202).send({
        status: false,
        message: "Missing required fields.",
      });
    } else {
      Blog.findById({ _id: id }, (err, post) => {
        if (err) {
          return res.status(202).send({
            status: false,
            error: err.message,
          });
        } else {
          post.views = post.views + 1;
          post.save((failed, success) => {
            if (failed) {
              return res.status(202).send({
                status: false,
                error: failed.message,
              });
            } else {
              return res.status(200).send({
                status: true,
              });
            }
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
          error: err.message,
        });
      } else {
        return res.status(200).send({
          status: true,
          blogs: response,
        });
      }
    }).populate("author");
  } catch (error) {
    return res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};
controller.getRecomended = (req, res) => {
  try {
    Blog.find({ deleted: false, active: true })
      .sort({ createdAt: "Desc" })
      .limit(3)
      .populate("author")
      .exec((err, response) => {
        if (err) {
          return res.status(202).send({
            status: false,
            error: err.message,
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
controller.getbyIdPublic = (req, res) => {
  try {
    const { id } = req.params;
    Blog.findOne({ _id: id, deleted: false, active: true }, (err, response) => {
      if (err) {
        return res.status(202).send({
          status: false,
          error: err.message,
        });
      } else if (response == null) {
        return res.status(200).send({
          status: false,
          message: "No blog found",
          blog: response,
        });
      } else {
        return res.status(200).send({
          status: true,
          blog: response,
        });
      }
    }).populate("author");
  } catch (error) {
    return res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};
controller.getbyIdPrivate = (req, res) => {
  try {
    const { id } = req.params;
    Blog.findOne({ _id: id, deleted: false }, (err, response) => {
      if (err) {
        return res.status(202).send({
          status: false,
          error: err.message,
        });
      } else if (response == null) {
        return res.status(200).send({
          status: false,
          message: "No blog found",
          blog: response,
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
controller.getPrivateBlogs = (req, res) => {
  try {
    Blog.find({ deleted: false, author: req.user.id }, (err, response) => {
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
