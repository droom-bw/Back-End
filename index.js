require("dotenv").config();
const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

const seekersRouter = require("./Jobseeker/seekers-router.js");
server.use("/seekers", seekersRouter);

const companiesRouter = require("./Company/company-router.js");
server.use("/companies", companiesRouter);

server.get("/", (req, res) => {
  res.status(200).send("Sanity Check");
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
