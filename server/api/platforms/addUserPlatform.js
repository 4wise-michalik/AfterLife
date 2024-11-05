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
      `INSERT INTO connected_platforms (user_id, platform_id, email, password) 
       VALUES (?, ?, ?, ?)`,
      [body.userId, body.platformId, body.login, body.password]
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
