const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  find,
  findById,
  findBy,
  findByEmail,
  remove,
  update,
  findJobsById,
  insertMatches,
  removeMatches,
  displayMatchesTable
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
  const seekerQuery = findBy({ id }).first();

  return Promise.all([seekerQuery, findJobsById(id)]).then(([seeker, jobs]) => {
    seeker.jobs = jobs;
    // console.log("s", seeker);
    return seeker;
  });
}

function find() {
  return db("seekers").select("id", "name", "email", "location", "resume");
}

function remove(id) {
  return findBy({ id }).del();
}

function update(id, changes) {
  return findBy({ id }).update(changes);
}

function findJobsById(id) {
  console.log("id", id);
  return db("matches AS m")
    .select(
      "m.job_id",
      "c.name as company_name",
      "j.title",
      "j.description",
      "j.salary"
    )
    .join("jobs as j", "j.id", "m.job_id")
    .join("companies as c", "c.id", "j.company_id")
    .where({ "m.seeker_id": id });
}

function insertMatches(jobMatches) {
  return db("matches")
    .insert(jobMatches, "id")
    .then(([id]) => db("matches").where({ id }));
}

function removeMatches(id) {
  return db("matches")
    .where({ id })
    .del();
}
function displayMatchesTable() {
  return db("matches");
}
