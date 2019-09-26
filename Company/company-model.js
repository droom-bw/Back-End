const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  findById,
  find,
  remove,
  update,
  findJobs,
  findJobsBy,
  findJobsByCompany,
  insertJob
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
function jobsFindBy(where) {
  return db("jobs").where(where);
}

function findJobs() {
  return db("jobs");
}

function findJobsBy(id) {
  return jobsFindBy({ id }).first();
}

function findJobsByCompany(id) {
  return findById(id)
    .first()
    .then(response => {
      const company_id = response.id;
      return findJobsBy(company_id);
    });
}

//! - - - - - - - - -

function insertJob(job) {
  return db("jobs")
    .insert(job, "id")
    .then(([id]) => findById(id));
}

function findById(id) {
  return findJobsBy({ id }).first();
}
