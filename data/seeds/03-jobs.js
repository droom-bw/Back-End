exports.seed = function(knex, Promise) {
  return knex("jobs")
    .del()
    .then(() =>
      knex("jobs").insert([
        {
          company_id: 1,
          title: "full stack developer",
          description: "software engineer who knows REACT",
          salary: 1500000
        },
        {
          company_id: 2,
          title: "data scientist",
          description: "python, R, required",
          salary: 1000000
        }
      ])
    );
};
