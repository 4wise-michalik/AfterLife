import mysql from "mysql2/promise";
import { convertCalendarToDate } from "~/composables/convertCalendar";
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

  const date = await convertCalendarToDate(body.time);

  try {
    connection = await mysql.createConnection(config);

    const [result] = await connection.query(`UPDATE messages SET content = ?, time = ? WHERE id = ?`, [body.content, date, body.messageId]);
    if (result.affectedRows === 0) {
      return {
        success: false,
        error: "No message found with the given ID.",
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
      error: "Database connection failed or query execution error.",
    };
  } finally {
    if (connection) await connection.end();
  }
});
