import mysql from "mysql2/promise";

const config = {
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
    connection = await mysql.createConnection(config);
    const [rows] = await connection.query(
      `SELECT * FROM memory_pages WHERE user_id = ?`,
      [body.id]
    );
    if (rows.length === 0) {
      return {
        success: false,
      };
    } else {
      return {
        success: true,
        data: rows,
      };
    }
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: "Database connection failed",
    };
  } finally {
    if (connection) await connection.end();
  }
});
