const router = require("express").Router();
const userController = require("./controller");

router.post("/", userController.sendEmailContact);

module.exports = router;
