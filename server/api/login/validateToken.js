import mysql from "mysql2/promise";
const databaseConfig = {
  host: process.env.MARIA_DB_HOST,
  user: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASSWORD,
  database: process.env.MARIA_DB_DATABASE,
  port: 3306,
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  let connection;
  try {
    connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query("SELECT * FROM tokens WHERE user_id = ?;", [body.id]);

    if (rows[0].token == body.token) {
      return { response: true };
    } else {
      return { response: false };
    }
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Database connection failed" };
  } finally {
    if (connection) await connection.end();
  }
});
