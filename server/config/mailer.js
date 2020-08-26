const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars")


let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});


const handlebarOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: 'server/views/patials',
        layoutsDir: 'server/views/layouts',
        defaultLayout: '',
    },
    viewPath: 'server/views/templates',
    extName: '.handlebars',
};

transporter.use('compile', hbs(handlebarOptions));



exports.welcomeMail = (email, name) => transporter.sendMail({
    from: 'Vue Mailer',
    to: email,
    subject: "Account Creation",
    template: "welcome",
    context: {
        user: name
    }
});

/*
transporter.sendMail({
  from: "moebius.ph",
  to: process.env.TO_EMAIL,
  subject: "Contact from moebius.ph",
  template: "contact",
  context: {
    name: name !== "null" ? name : "-",
    email: email !== "null" ? email : "-",
    message: message !== "null" ? message : "-",
  },
});

transporter.sendMail({
  from: "moebius.ph",
  to: process.env.TO_EMAIL,
  subject: "Application for " + job_title + "  from moebius.ph",
  template: "applyJob",
  context: {
    job_title: job_title !== "null" ? job_title : "-",
    name: name !== "null" ? name : "-",
    email: email !== "null" ? email : "-",
    phone: phone !== "null" ? phone : "-",
    link: link !== "null" ? link : "-",
  },
  attachments,
});
*/

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactMail = (name, email, message) =>
  sgMail.send({
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    templateId: process.env.TEMPLATE_ID_CONTACT,
    dynamicTemplateData: {
      name: name !== "null" ? name : "-",
      email: email !== "null" ? email : "-",
      message: message !== "null" ? message : "-",
    },
  });

exports.applyJobMail = (job_title, name, email, phone, link, attachments) =>
  sgMail.send({
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    templateId: process.env.TEMPLATE_ID_APPLY_JOB,
    dynamicTemplateData: {
      job_title: job_title !== "null" ? job_title : "-",
      name: name !== "null" ? name : "-",
      email: email !== "null" ? email : "-",
      phone: phone !== "null" ? phone : "-",
      link: link !== "null" ? link : "-",
    },
    attachments,
  });