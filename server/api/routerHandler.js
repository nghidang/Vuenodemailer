const userRoute = require("./User/routes");
const contactRoute = require("./Contact/routes");
const applyJobRoute = require("./ApplyJob/routes");

module.exports = (app) => {
    app.use("/user", userRoute);
    app.use("/contact", contactRoute);
    app.use("/applyjob", applyJobRoute);
}