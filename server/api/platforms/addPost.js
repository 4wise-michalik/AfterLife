import mysql from "mysql2/promise";

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

  let year = "";
  if (body.time.years < 9) {
    year = "000" + (body.time.years + 1); // +1 because the year '0000' cannot be entered into the database
  } else {
    year = "00" + (body.time.years + 1); // +1 because the year '0000' cannot be entered into the database
  }

  let months = body.time.months + 1; // +1 because the year '0000' cannot be entered into the database
  let days = body.time.days + 1; // +1 because the year '0000' cannot be entered into the database
  if (days > 31) {
    days = 1;
    months++;
  }

  const hours = body.time.hours;
  const minutes = body.time.minutes;

  const date = `${year}-${months}-${days} ${hours}:${minutes}:00`;

  try {
    connection = await mysql.createConnection(config);
    const [result] = await connection.query(
      `INSERT INTO posts (platform_id, content, time, user_id) VALUES (?, ?, ?, ?)`,
      [body.platformId, body.content, date, body.userId]
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
