import sql from "mssql";
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

  var year = "";
  if (body.whatHappendsToAccountTime.years < 9) {
    year = "000" + (body.whatHappendsToAccountTime.years + 1); // +1 bo nie można wpisać do bazy roku '0000'
  } else {
    year = "00" + (body.whatHappendsToAccountTime.years + 1); // +1 bo nie można wpisać do bazy roku '0000'
  }
  var months = body.whatHappendsToAccountTime.months + 1; // +1 bo nie można wpisać do bazy roku '0000'
  var days = body.whatHappendsToAccountTime.days + 1; // +1 bo nie można wpisać do bazy roku '0000'
  if (days > 31) {
    days = 1;
    months++;
  }
  var hours = body.whatHappendsToAccountTime.hours;
  var minutes = body.whatHappendsToAccountTime.minutes;

  var date = year + "-" + months + "-" + days + " " + hours + ":" + minutes + ":00";

  try {
    pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(
        `UPDATE connected_platforms SET what_happends_to_account=${body.whatHappendsToAccount}, what_happends_to_account_time='${date}' WHERE user_id=${body.userId} AND platform_id=${body.platformId};`
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
