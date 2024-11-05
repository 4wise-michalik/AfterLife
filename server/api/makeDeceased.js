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
  const { userId, deceasedTime } = body;

  let connection;
  try {
    // Connect to MySQL
    connection = await mysql.createConnection(config);

    // Execute SQL query to update user data
    const [rows] = await connection.execute(
      `
      UPDATE users 
      SET deceased=1, deceased_time=?
      WHERE id=?
    `,
      [deceasedTime, userId]
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
    if (connection) connection.end();
  }
});
