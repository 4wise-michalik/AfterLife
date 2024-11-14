import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
const databaseConfig = {
  host: process.env.MARIA_DB_HOST,
  user: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASSWORD,
  database: process.env.MARIA_DB_DATABASE,
  port: 3306,
};
const config = {
  JWT_SECRET: process.env.JWT_TOKEN,
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  let connection;
  try {
    connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [body.email, body.password]);

    if (rows.length > 0) {
      const token = jwt.sign({ id: rows[0].id, username: rows[0].email }, String(config.JWT_SECRET), { expiresIn: "1h" });

      return { success: true, token: token };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Database connection failed" };
  } finally {
    if (connection) await connection.end();
  }
});
