// Deletes ALL existing entries
exports.seed = function(knex, Promise) {
  return knex("matches")
    .del()
    .then(() => knex("jobs").del())
    .then(() => knex("companies").del())
    .then(() => knex("seekers").del());
};
