const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  findById,
  find,
  findByEmail
};

function insert(seeker) {
  return db("seekers")
    .insert(seeker, "id")
    .then(([id]) => findById(id));
}

function findBy(where) {
  return db("seekers").where(where);
}

function findByEmail(email) {
  return findBy({ email }).first();
}

function findById(id) {
  return findBy({ id }).first();
}

function find() {
  return db("seekers").select("name", "email", "location", "resume");
}
