const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.status(200).send("Sanity Check");
});

server.use(helmet());
server.use(cors());
server.use(express.json());

module.exports = server;
