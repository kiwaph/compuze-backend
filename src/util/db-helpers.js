import { db } from './db-connection.js';

export async function initDatabase() {
  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('username');
      table.string('password');
      table.string('email');
      table.string('phone');
      table.string('created_at');
    });
  }

  if (!(await db.schema.hasTable('items'))) {
    await db.schema.createTable('items', (table) => {
      table.increments('id');
      table.string('type');
      table.string('brand');
      table.string('model');
      table.string('description');
      table.string('location');
      table.integer('price');
      table.integer('views');
      table.string('created_at');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
    });
  }

  if (!(await db.schema.hasTable('comments'))) {
    await db.schema.createTable('comments', (table) => {
      table.increments('id');
      table.string('content');
      table.string('created_at');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('CASCADE');
    });
  }

  if (!(await db.schema.hasTable('messages'))) {
    await db.schema.createTable('messages', (table) => {
      table.increments('id');
      table.string('subject');
      table.string('content');
      table.integer('is_read').defaultTo(0);
      table.string('created_at');
      table
        .integer('sender_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('recipient_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
    });
  }

  if (!(await db.schema.hasTable('favorites'))) {
    await db.schema.createTable('favorites', (table) => {
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('CASCADE');
    });
  }
}
