const express = require("express");

const cors = require("cors");

const app = express();

const messageRoutes = require("./routes/messageRoutes");

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/sendMessage", messageRoutes);

app.all("*", (req, res, next) => {
  return res.status(404).json({ message: "not found !" });
});

module.exports = app;
