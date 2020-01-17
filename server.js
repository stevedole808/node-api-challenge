const express = require("express");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Kill this sprint!");
});

const actionsRouter = require('./data/routes/actionsRouter')
const projectsRouter = require('./data/routes/projectsRouter')

module.exports = server;


server.use("/api/projects", projectsRouter);

server.use("/api/actions", actionsRouter);

module.exports = server;