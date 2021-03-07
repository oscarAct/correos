const mongoose = require("mongoose");

const { Schema } = mongoose;

const blogSchema = Schema(
  {
    title: { type: String, required: true, trim: true },
    text: { type: String, required: false },
    description: { type: String, required: true },
    body: { type: String, required: false },
    blogImg: { type: String, required: true, trim: true },
    active: { type: Boolean, required: true, default: false },
    deleted: { type: Boolean, rquired: true, default: false },
  },
  { versionKey: false, timestamps: true }
);
module.exports = mongoose.model("blog", blogSchema);
