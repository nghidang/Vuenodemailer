let mailer = require("../../config/mailer");

exports.sendEmailContact = async (req, res) => {
  try {
    mailer.contactMail(req.body.name, req.body.email, req.body.message);

    res.status(200).json({
      msg: "Sent email",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err,
    });
  }
};
