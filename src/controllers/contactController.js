const User = require("../models/contactModel");
const nodemailer = require("nodemailer");
const moment = require("moment");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS, // generated ethereal user
    pass: process.env.EMAIL_PASS,
  },
});
const controller = {};

controller.sendMail = (req, res) => {
  console.log(req.connection.remoteAddress);
  const today = moment().format("MM/DD/YYYY");
  console.log(today);
  let id = "";
  try {
    User.find(
      { ipAddress: req.connection.remoteAddress, submittedDate: today },
      (err, response) => {
        if (err) {
          return res.send.status(500).send({ status: false });
        } else if (response[0]) {
          return res.status(418).send({ status: false });
        } else {
          const { name, email, message } = req.body;

          if (!name || !email || !message) {
            return res.status(200).send({
              status: false,
              error: {
                message: "Missing riquired fields.",
              },
            });
          } else {
            const user = new User();
            user.name = name;
            user.email = email;
            user.message = message;
            user.ipAddress = req.connection.remoteAddress;
            user.submittedDate = today;

            user.save((err, response) => {
              if (err) {
                return res.status(500).send({
                  status: false,
                  message: "Error saving data",
                  error: {
                    message: err.message,
                  },
                });
              } else {
                id = response._id;
                var mailOptions = {
                  from: "contacto@omorales.tech",
                  to: "contacto@omorales.tech",
                  subject: "Alguien quiere comunicarse contigo",
                  text:
                    "Nombre de la persona: " +
                    name +
                    "\n" +
                    "Correo electrónico: " +
                    email +
                    "\n" +
                    "Mensaje: " +
                    message,
                };
                transporter.sendMail(mailOptions, function (failed, info) {
                  if (failed) {
                    User.findByIdAndDelete(id, (fail, success) => {
                      if (fail) {
                        console.log(fail.message);
                        return res.status(500).send({
                          status: false,
                          error: fail,
                          message: "Failed deleting data.",
                        });
                      } else {
                        return res.status(500).send({
                          status: false,
                          error: failed.message,
                          message: "Mensaje",
                        });
                      }
                    });
                  } else {
                    return res.status(200).send({
                      status: true,
                      message: "Mail sent successfully.",
                    });
                  }
                });
              }
            });
          }
        }
      }
    );
  } catch (error) {
    return res.status(500).send({
      status: false,
      error: error.message,
      message: "Catched error.",
    });
  }
};

module.exports = controller;
