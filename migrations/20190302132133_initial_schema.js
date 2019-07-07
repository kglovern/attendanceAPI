/* tslint:disable */
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('Student', table => {
            table.increments('id').primary();
            table.text('firstName').notNull();
            table.text('lastName').notNull();
            table.text('userId');
            table.text('studentNumber');
            table.text('studentUPC').notNull()
        })
        .createTable('ClassOffering', table => {
            table.increments('id').primary();
            table.text('courseCode').notNull();
            table.text('courseName').notNull();
            table.integer('enrollCap').default(0)
        })
        .createTable('ClassOffering_Student', table => {
            table.increments('id').primary();
            table.integer('student_id').references('id').inTable('Student').onDelete('CASCADE');
            table.integer('classOffering_id').references('id').inTable('ClassOffering').onDelete('CASCADE')
        })
        .createTable('Attend', table => {
            table.increments('id').primary();
            table.text('barcode').notNull();
            table.timestamps(true, true);
        })
        .createTable('Event', table => {
            table.increments('id').primary();
            table.text('level').notNull();
            table.text('message').notNull();
            table.timestamps(true, true);
        });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable('ClassOffering_Student')
        .dropTable('ClassOffering')
        .dropTable('Student')
        .dropTable('Attend')
        .dropTable('Event')
};
