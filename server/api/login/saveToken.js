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

    await connection.query("REPLACE INTO tokens (user_id, token) VALUES (?, ?)", [body.id, body.token]);
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Database connection failed" };
  } finally {
    if (connection) await connection.end();
  }
});
