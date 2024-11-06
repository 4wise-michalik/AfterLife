import mysql from "mysql2/promise";
import { convertCalendar } from "@/composables/convertCalendar";
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

  const { convertCalendarToDate, convertCalendarToObj } = convertCalendar();
  const date = await convertCalendarToDate(body.time);

  try {
    connection = await mysql.createConnection(config);

    const [rows] = await connection.query(
      `UPDATE posts SET content = ?, time = ? WHERE id = ?`,
      [body.content, date, body.postId]
    );

    return {
      success: true,
      data: rows,
    };
  } catch (error) {
    console.error("Database error:", error); // Zaloguj dokładny błąd
    return {
      success: false,
      error: "Database connection failed or query execution error.",
    };
  } finally {
    if (connection) await connection.end();
  }
});