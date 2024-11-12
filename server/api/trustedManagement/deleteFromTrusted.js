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

  console.log(body.userId, body.trustedId);

  try {
    connection = await mysql.createConnection(config);
    const [result] = await connection.query(`DELETE FROM trusted WHERE user_id=${body.userId} and trusted_id=${body.trustedId};`);
    const [result2] = await connection.query(
      `UPDATE connected_platforms SET what_happens_to_account=0, what_happens_to_account_give_account_id=0 WHERE user_id=${body.userId} AND what_happens_to_account_give_account_id=${body.trustedId};`
    );
    return {
      success: true,
      data: { result, result2 },
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
