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
      `SELECT 1 FROM memory_pages WHERE user_id = ?`,
      [body.id]
    );

    if (rows.length > 0) {
      await connection.query(
        `UPDATE memory_pages SET link = ? WHERE user_id = ?`,
        [body.link, body.id]
      );
    } else {
      await connection.query(
        `INSERT INTO memory_pages (user_id, link) VALUES (?, ?)`,
        [body.id, body.link]
      );
    }

    return { success: true };
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
