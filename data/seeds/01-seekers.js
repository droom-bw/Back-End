exports.seed = function(knex, Promise) {
  return knex("seekers")
    .del()
    .then(() =>
      knex("seekers").insert([
        {
          name: "abcd",
          email: "xyzd@email.com",
          password:
            "$2a$08$LvkWiJSMRJ412qyniAMwieLY5uvu7NQ8.Fjk9w5jl3ZYrquJLQODa",
          location: "island",
          resume: "web21"
        }
      ])
    );
};
