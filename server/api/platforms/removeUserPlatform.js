import mysql from "mysql2/promise";

const config = {
  host: process.env.MARIA_DB_HOST,
  user: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASSWORD,
  database: process.env.MARIA_DB_DATABASE,
  port: 3306,
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Read the request body
  let connection;

  try {
    connection = await mysql.createConnection(config);
    const [result] = await connection.query(
      `DELETE FROM connected_platforms WHERE user_id = ? AND platform_id = ?`,
      [body.userId, body.platformId]
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
