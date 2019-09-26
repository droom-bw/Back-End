const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  findById,
  find,
  remove,
  update,
  findJobs
};

function insert(company) {
  return db("companies")
    .insert(company, "id")
    .then(([id]) => findById(id));
}

function findById(id) {
  return findBy({ id }).first();
}

function find() {
  return db("companies").select("id", "name", "email");
}

function remove(id) {
  return findBy({ id }).del();
}

function update(id, changes) {
  return findBy({ id }).update(changes);
}

function findBy(where) {
  return db("companies").where(where);
}

//! = = = = = = = = = =
function findJobs() {
  return db("jobs");
}
