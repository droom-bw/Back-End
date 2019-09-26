const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  findById,
  find,
  findByEmail,
  remove,
  update,
  findJobsById
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
  return db("matches AS m")
    .select(
      "m.job_id",
      "c.name as company_name",
      "j.title",
      "j.description",
      "j.salary"
    )
    .join("jobs as j", "j.id", "m.id")
    .join("companies as c", "c.id", "j.company_id")
    .where({ "m.seeker_id": id });
}
