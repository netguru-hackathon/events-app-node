
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').nullable();
    t.dateTime('deletedAt').nullable();
    t.string('name').notNull();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
