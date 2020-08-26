let mailer = require("../../config/mailer");

exports.sendEmailApplyJob = async (req, res) => {
  try {
    let attachments = req.files
      ? [
          {
            content: req.files.attachment.data.toString("base64"),
            filename: req.files.attachment.name,
            type: req.files.attachment.mimetype,
            disposition: "attachment",
            // contentId: req.files.attachment.md5,
          },
        ]
      : [];

    mailer.applyJobMail(
      req.body.job_title,
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.link,
      attachments
    );

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
