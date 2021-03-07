const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: false },
    message: { type: String, required: true },
    ipAddress: { type: String, required: true },
    submittedDate: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);
module.exports = mongoose.model("Contact", contactSchema);
