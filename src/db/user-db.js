import { db } from '../util/db-connection.js';

export class User {
  constructor({ username, password, email, phone }) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.createdAt = Date.now();
  }

  async save() {
    await db('users').insert({
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
      created_at: this.createdAt,
    });
  }

  static async fetchById(userId) {
    const users = await db('users').where({ id: userId });
    if (!users.length) return false;
    return users[0];
  }

  static async fetchByUsername(username) {
    const user = await db('users').where({ username: username });
    if (!user.length) return false;
    return user[0];
  }

  static async editField({ userId, field, value }) {
    return await db('users')
      .where({ id: userId })
      .update({ [field]: value });
  }
}
