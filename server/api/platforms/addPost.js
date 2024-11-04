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
  const body = await readBody(event);
  let pool;
  var year = "";
  if (body.time.years < 9) {
    year = "000" + (body.time.years + 1); // +1 bo nie można wpisać do bazy roku '0000'
  } else {
    year = "00" + (body.time.years + 1); // +1 bo nie można wpisać do bazy roku '0000'
  }
  var months = body.time.months + 1; // +1 bo nie można wpisać do bazy roku '0000'
  var days = body.time.days + 1; // +1 bo nie można wpisać do bazy roku '0000'
  if (days > 31) {
    days = 1;
    months++;
  }
  var hours = body.time.hours;
  var minutes = body.time.minutes;

  var date =
    year + "-" + months + "-" + days + " " + hours + ":" + minutes + ":00";

  try {
    pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(
        `INSERT INTO posts (platform_id, content, time, user_id) VALUES (${body.platformId}, '${body.content}', '${date}', ${body.userId});`
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
