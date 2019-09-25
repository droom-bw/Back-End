const app = require("express").Router();
const Companies = require("./company-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../secret/secret");
const mid = require("../middleware/middleware.js");

function generateToken(company) {
  const payload = {
    name: company.name,
    id: company.id
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

app.post("/register", (req, res) => {
  try {
    const { name, email, password } = req.body;
    Companies.insert({
      name,
      email,
      password: bcrypt.hashSync(password, 12)
    }).then(response => {
      const token = generateToken(response);
      res.status(201).json({ message: "Company registered", response, token });
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    Companies.findByEmail(email).then(response => {
      if (response && bcrypt.compareSync(password, response.password)) {
        const token = generateToken(response);
        res.status(200).json({
          message: "You have logged in",
          token,
          response
        });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in user" });
  }
});

app.get("/", mid.restrict, (req, res) => {
  try {
    Companies.find().then(response => {
      res.status(200).json(response);
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving companies" });
  }
});

module.exports = app;
