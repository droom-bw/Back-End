const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.get("/", (req, res) => {
  res.status(200).send("Sanity Check");
});

server.use(helmet());
server.use(cors());
server.use(express.json());

module.exports = server;
