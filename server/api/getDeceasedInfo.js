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
  try {
    pool = await sql.connect(config);
    const result = await pool.request().query(
      `SELECT 
        (SELECT name FROM platforms WHERE platforms.id=platform_id) as platform, 
        email, 
        password, 
        what_happends_to_account, 
        what_happends_to_account_time, 
        what_happends_to_account_give_account_id, 
        what_happends_to_account_give_account_message,
        (SELECT deceased_time FROM users WHERE users.id=${body.userId}) as death_time
        FROM connected_platforms 
        WHERE user_id=${body.userId} AND what_happends_to_account_give_account_id=${body.trustedId}`
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
