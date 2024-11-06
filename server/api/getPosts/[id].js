import mysql from "mysql2/promise";
const config = {
  host: process.env.MARIA_DB_HOST,
  user: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASSWORD,
  database: process.env.MARIA_DB_DATABASE,
  port: 3306,
};

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id;
  let connection;

  try {
    connection = await mysql.createConnection(config);
    const [result] = await connection.query(
      `
      SELECT p.id as id, p.platform_id, content, time, user_id, pt.name,
        CAST(p.time AS CHAR) AS time
        FROM posts p
        LEFT JOIN platforms pt ON p.platform_id = pt.id
        WHERE p.user_id = ?
    `,
      [userId]
    );

    return {
      success: true,
      data: result,
    };
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
