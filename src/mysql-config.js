import mysql from "mysql2/promise";

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'usersdb'
};

const connection = await mysql.createConnection(config);
console.log('Connected to the MySQL database.');

export default connection;
