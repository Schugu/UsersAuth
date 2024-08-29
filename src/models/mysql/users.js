import connection from '../../mysql-config.js'

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
}