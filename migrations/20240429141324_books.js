/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("books", function (table) {
    table.increments("id").primary();
    table.string("name");
    table.float("average_rating").notNullable().defaultTo(0);
    table.float("total_rating").notNullable().defaultTo(0);
    table.integer("total_rates").notNullable().defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("books");
};
