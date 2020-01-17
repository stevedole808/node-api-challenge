const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Kill this sprint!");
});

module.exports = server;
 