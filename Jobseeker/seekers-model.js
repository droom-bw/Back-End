const db = require("../database/dbConfig.js");

module.exports = {
  insert,
  findByUsername,
  find
};

function insert(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => id);
}

function findBy(where) {
  return db("users").where(where);
}

function findByUsername(username) {
  return findBy({ username }).first();
}

function find() {
  return db("users");
}
