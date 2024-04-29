/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("borrowed_books", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.integer("book_id").unsigned().references("id").inTable("books");
    table.float("rating");
    table.date("borrow_date");
    table.date("return_date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("borrowed_books");
};
