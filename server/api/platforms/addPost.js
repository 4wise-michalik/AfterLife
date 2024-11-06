import sql from "mysql2/promise";
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
  console.log(body.time);

  const { convertCalendarToDate, convertCalendarToObj } = convertCalendar();
  var date = await convertCalendarToDate(body.time);

  console.log(date);

  try {
    pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(`INSERT INTO posts (platform_id, content, time, user_id) VALUES (${body.platformId}, '${body.content}', '${date}', ${body.userId});`);
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
