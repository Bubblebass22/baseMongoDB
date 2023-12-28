var express = require('express');
var router = express.Router();

const usersController = require("../controllers/usersController");

/* GET users listing. */
router.post('/', usersController.create);
router.post("/auth", usersController.login)

module.exports = router;
