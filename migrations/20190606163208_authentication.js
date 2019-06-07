/* tslint:disable */
exports.up = function(knex, Promise) {
  return knex.schema
      .createTable('User', table => {
          table.increments('id').primary();
          table.string('username', 30).notNullable();
          table.string('password', 60).notNullable();
          table.timestamps(true, true);
      });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('User');
};
