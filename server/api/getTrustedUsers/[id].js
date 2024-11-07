import mysql from "mysql2/promise";

const config = {
  host: process.env.MARIA_DB_HOST,
  user: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASSWORD,
  database: process.env.MARIA_DB_DATABASE,
  port: 3306,
};

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id;
  let connection;

  try {
    connection = await mysql.createConnection(config);
    const [rows] = await connection.query(
      `SELECT u.id, u.first_name, u.last_name, u.email, u.verified_email, u.verifing_method, t.bff, t.reported 
        FROM trusted t
        inner join users u on t.trusted_id=u.id 
        where t.user_id=?`,
      [userId]
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
