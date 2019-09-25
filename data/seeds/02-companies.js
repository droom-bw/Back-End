exports.seed = function(knex, Promise) {
  return knex("companies")
    .del()
    .then(() =>
      knex("companies").insert([
        {
          name: "company1",
          email: "company1@email.com",
          password:
            "$2a$08$LvkWiJSMRJ412qyniAMwieLY5uvu7NQ8.Fjk9w5jl3ZYrquJLQODa"
        }
      ])
    );
};
