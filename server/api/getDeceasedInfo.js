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
      `SELECT 
        (SELECT name FROM platforms WHERE platforms.id = connected_platforms.platform_id) as platform, 
        email, 
        password, 
        what_happens_to_account, 
        what_happens_to_account_time, 
        what_happens_to_account_give_account_id, 
        what_happens_to_account_give_account_message,
        users.deceased_time as death_time
      FROM connected_platforms 
      JOIN users ON users.id = ? 
      WHERE connected_platforms.user_id = ? 
        AND connected_platforms.what_happens_to_account_give_account_id = ?`,
      [body.userId, body.userId, body.trustedId]
    );

    return {
      success: true,
      data: rows,
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
