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

  var date = await convertCalendarToDate(body.time);

  try {
    connection = await mysql.createConnection(config);
    const [rows] = await connection.query(
      `INSERT INTO messages (platform_id, message_receiver, content, time, user_id) VALUES (${body.platformId}, '${body.messageReceiver}', '${body.content}', '${date}', ${body.userId});`
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
