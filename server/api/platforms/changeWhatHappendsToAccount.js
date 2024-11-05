import sql from "mssql";
import { convertCalendar } from "@/composables/convertCalendar";
const config = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Read the request body
  let pool;
  const { convertCalendarToDate, convertCalendarToObj } = convertCalendar();

  var personId = body.whoToPassAccount.id;
  var date = await convertCalendarToDate(body.whatHappendsToAccountTime);
  console.log(date.toISOString());

  try {
    pool = await sql.connect(config);
    const result = await pool.request().query(
      `UPDATE connected_platforms
          SET what_happends_to_account=${
            body.whatHappendsToAccount
          }, what_happends_to_account_time='${date.toISOString()}', what_happends_to_account_give_account_id=${personId}, what_happends_to_account_give_account_message='${
        body.message
      }'
          WHERE user_id=${body.userId} AND platform_id=${body.platformId};`
    );
    return {
      success: true,
      data: result.recordset,
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: "Database connection failed",
    };
  } finally {
    if (pool) pool.close();
  }
});
