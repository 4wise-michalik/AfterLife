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
          reported, 
          (SELECT COUNT(*) FROM trusted WHERE reported = 1 AND user_id = ?) AS total, 
          (SELECT COUNT(*) FROM trusted WHERE user_id = ?) AS trusted_number, 
          (SELECT deceased FROM users WHERE id = ?) AS is_deceased, 
          (SELECT what_happens_to_account_give_account_id FROM connected_platforms WHERE user_id = ? AND what_happens_to_account_give_account_id = ?) AS what_happens_to_account_give_account_id
        FROM trusted 
        WHERE trusted_id = ? AND user_id = ?`,
      [body.userId, body.userId, body.userId, body.userId, body.trustedId, body.trustedId, body.userId]
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
