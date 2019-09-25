exports.seed = function(knex, Promise) {
  return knex("matches")
    .del()
    .then(() =>
      knex("matches").insert([
        {
          seeker_id: 1,
          job_id: 1
        }
      ])
    );
};
