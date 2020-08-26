const router = require("express").Router();
const userController = require("./controller");

router.post("/", userController.sendEmailApplyJob);

module.exports = router;