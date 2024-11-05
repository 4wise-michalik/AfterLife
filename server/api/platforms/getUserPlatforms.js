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
    const [rows] = await connection.query(
      `SELECT user_id, platform_id, 
              (SELECT name FROM platforms WHERE id = platform_id) as platform_name, 
              what_happens_to_account, 
              what_happens_to_account_time, 
              what_happens_to_account_give_account_id, 
              what_happens_to_account_give_account_message 
       FROM connected_platforms 
       WHERE user_id = ?`,
      [body.userId]
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
