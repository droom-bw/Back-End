const router = require("express").Router();
const Seekers = require("./seekers-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../secret/secret.js");
const mid = require("../middleware/middleware.js");

function generateToken(seeker) {
  const payload = {
    name: seeker.name,
    id: seeker.id
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

router.post("/register", (req, res) => {
  const { name, email, password, location, resume } = req.body;
  Seekers.insert({
    name,
    email,
    password: bcrypt.hashSync(password, 8),
    location,
    resume
  })
    .then(seeker => {
      const token = generateToken(seeker);

      res.status(201).json({ message: "Seeker registered", seeker, token });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error registering user" });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Seekers.findByEmail(email)
    .then(seeker => {
      if (seeker && bcrypt.compareSync(password, seeker.password)) {
        const token = generateToken(seeker);
        res.status(200).json({
          message: "You have logged in",
          token
        });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error logging in user" });
    });
});

router.get("/", mid.restrict, (req, res) => {
  Seekers.find()
    .then(seekers => res.status(200).json(seekers))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving seekers" });
    });
});

module.exports = router;
