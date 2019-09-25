const Seekers = require("../Jobseeker/seekers-model.js");
const Companies = require("../Company/company-model");
const jwt = require("jsonwebtoken");
const secret = require("../secret/secret.js");

module.exports = { validateId, validateIdCompany, restrict };

function validateId(req, res, next) {
  const { id } = req.params;
  Seekers.findById(id).then(seeker => {
    if (seeker) {
      req.seeker = seeker;
      next();
    } else {
      res.status(404).json({ error: "invalid job seeker id" });
    }
  });
}

function validateIdCompany(req, res, next) {
  const { id } = req.params;
  Companies.findById(id).then(response => {
    if (response) {
      req.company = response;
      next();
    } else {
      res.status(404).json({ error: "invalid company id" });
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
