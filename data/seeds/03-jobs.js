exports.seed = function(knex, Promise) {
  return knex("jobs")
    .del()
    .then(() =>
      knex("jobs").insert([
        {
          company_id: 1,
          title: "full stack developer",
          description: "software engineer who knows REACT",
          salary: 1000000
        }
      ])
    );
};
