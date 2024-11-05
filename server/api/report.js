import mysql from "mysql2/promise";
import { readBody } from "h3";

const config = {
  host: process.env.MARIA_DB_HOST,
  user: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASSWORD,
  database: process.env.MARIA_DB_DATABASE,
  port: 3306,
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { trustingId, trustedId } = body;

  let connection;
  try {
    // Connect to MySQL
    connection = await mysql.createConnection(config);

    // Execute SQL query to update user data
    const [result] = await connection.execute(
      `
      UPDATE trusted 
      SET reported = 1
      WHERE user_id = ? AND trusted_id = ?
    `,
      [trustingId, trustedId]
    );

    return {
      success: true,
      message: "User data updated successfully",
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: "Failed to update user data",
    };
  } finally {
    if (connection) await connection.end();
  }
});
