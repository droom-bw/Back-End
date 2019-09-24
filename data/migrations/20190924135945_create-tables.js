exports.up = function(knex) {
  return (
    knex.schema
      //! SEEKERS
      .createTable("seekers", tbl => {
        tbl.increments();
        tbl.text("name").notNullable();
        tbl
          .text("email")
          .unique()
          .notNullable();
        tbl.text("password").notNullable();
        tbl.text("location");
        tbl.text("resume").defaultTo("A resume was not provided");
      })
      //! COMPANIES
      .createTable("companies", tbl => {
        tbl.increments();
        tbl
          .text("name")
          .unique()
          .notNullable();
        tbl
          .text("email")
          .unique()
          .notNullable();
        tbl.text("password").notNullable();
      })
      //! JOBS
      .createTable("jobs", tbl => {
        tbl.increments();
        tbl
          .integer("company_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("companies")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        tbl.text("title").notNullable();
        tbl.text("description").notNullable();
        tbl.integer("salary").notNullable();
      })
      //! MATCHES
      .createTable("matches", tbl => {
        tbl.increments();
        tbl
          .integer("seeker_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("seekers")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        tbl
          .integer("job_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("jobs")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        tbl.unique(["seeker_id", "job_id"], "matches");
      })
  );
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("matches")
    .dropTableIfExists("jobs")
    .dropTableIfExists("companies")
    .dropTableIfExists("seekers");
};
