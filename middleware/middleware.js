const Seekers = require("../Jobseeker/seekers-model.js");
const jwt = require("jsonwebtoken");
const secret = require("../secret/secret.js");

module.exports = { validateId, restrict };

function validateId(req, res, next) {
  console.log("checking");
  const { id } = req.params;
  Seekers.findBy({ id })
    .first()
    .then(seeker => {
      // console.log("middlewre_seeker", seeker);
      if (seeker) {
        req.seeker = seeker;
        next();
      } else {
        res.status(404).json({ error: "invalid job seeker id" });
      }
    });
}

function restrict(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "Token not valid"
        });
      } else {
        req.seeker = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No authorization token provided" });
  }
}
