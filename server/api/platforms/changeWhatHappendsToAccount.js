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
  const body = await readBody(event); // Read the request body
  let connection;
  const { convertCalendarToDate } = convertCalendar();

  const personId = body.whoToPassAccount.id;
  const date = await convertCalendarToDate(body.whatHappensToAccountTime);
  console.log(date.toISOString());

  try {
    connection = await mysql.createConnection(config);
    const [result] = await connection.query(
      `UPDATE connected_platforms
          SET what_happens_to_account = ?, 
              what_happens_to_account_time = ?, 
              what_happens_to_account_give_account_id = ?, 
              what_happens_to_account_give_account_message = ?
          WHERE user_id = ? AND platform_id = ?`,
      [
        body.whatHappendsToAccount,
        date.toISOString(),
        personId,
        body.message,
        body.userId,
        body.platformId,
      ]
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
