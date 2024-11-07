import mysql from "mysql2/promise";
const config = {
  host: process.env.MARIA_DB_HOST,
  user: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASSWORD,
  database: process.env.MARIA_DB_DATABASE,
  port: 3306,
};

export default defineEventHandler(async (event) => {
  const postId = event.context.params.id;
  let connection;
  try {
    connection = await mysql.createConnection(config);
    const [result] = await connection.query(`DELETE FROM posts WHERE id = ?`, [
      postId,
    ]);
    if (result.affectedRows === 0) {
      return {
        success: false,
        error: "No post found with the given ID.",
      };
    }
    return {
      success: true,
      data: { affectedRows: result.affectedRows },
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
