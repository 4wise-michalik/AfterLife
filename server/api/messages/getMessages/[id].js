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
      SELECT m.id as id, m.platform_id, content, time, user_id, message_receiver as messageReceiver, pt.name,
        CAST(m.time AS CHAR) AS time
        FROM messages m
        LEFT JOIN platforms pt ON m.platform_id = pt.id
        WHERE m.user_id = ?
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
