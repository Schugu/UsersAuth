import connection from '../../mysql-config.js'

import bcrypt from 'bcrypt';

export class UserModel {
  static async getAll({ username }) {
    if (username) {
      const [dataUsers] = await connection.query(
        `SELECT * FROM product WHERE username = ?`,
        [username]
      );

      if (dataUsers.length === 0) {
        return null;
      }

      return dataUsers;
    }

    try {
      const [dataUsers] = await connection.query(
        'SELECT BIN_TO_UUID(id) as id, username, email, password, created_at FROM user'
      )

      return dataUsers;
    } catch (error) {
      throw new Error('Error al encontrar los usuarios.');
    }
  }

  static async register({ username, email, password }) {
    if (username) {
      const [dataUser] = await connection.query(
        `SELECT * FROM user WHERE username = ?`,
        [username]
      );

      if (dataUser.length > 0) {
        return { usernameExists: true };
      }
    }

    if (email) {
      const [dataUser] = await connection.query(
        `SELECT * FROM user WHERE email = ?`,
        [email]
      );

      if (dataUser.length > 0) {
        return { emailExists: true };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      await connection.query(
        'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
      const [userFound] = await connection.query(
        `SELECT BIN_TO_UUID(id) as id FROM user WHERE (email) = (?)`,
        [email]
      );
      return userFound;

    } catch (error) {
      throw new Error('Error al registrarse.');
    }
  }

  static async login({ username, password }) {
    const [user] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, username, email, password, created_at FROM user WHERE username = ?`,
      [username]
    );

    if (user.length === 0) {
      return { notExists: true };
    }

    const isValid = await bcrypt.compare(password, user[0].password);

    if (!isValid) {
      return { notValid: true };
    }

    const { password: _, ...publicUser } = user[0];

    return publicUser;
  }
}