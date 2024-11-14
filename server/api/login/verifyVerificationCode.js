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

    // gets verification code
    const [rows] = await connection.query("SELECT code FROM verification_codes WHERE user_id = ? ", [body.userId]);

    // checks if given verification code is same as in the database
    if (rows[0].code == body.verificationCode) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Database connection failed" };
  } finally {
    if (connection) await connection.end();
  }
});
