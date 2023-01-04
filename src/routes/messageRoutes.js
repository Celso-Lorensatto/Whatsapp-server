const express = require("express");
const router = express.Router();

const sendMessage = require("../controller/sendController");

router.post("/send/:telefone", sendMessage.send);

router.get("/initialize", sendMessage.initialize);

module.exports = router;
