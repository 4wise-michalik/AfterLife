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
          reported, 
          (SELECT COUNT(*) AS total FROM trusted WHERE reported=1 AND user_id=${body.userId}) AS total, 
          (SELECT COUNT(*) FROM trusted where user_id=${body.userId}) AS trusted_number, 
          (SELECT deceased FROM users where id=${body.userId}) AS is_deceased, 
          (SELECT what_happends_to_account_give_account_id FROM connected_platforms WHERE user_id=${body.userId} AND what_happends_to_account_give_account_id=${body.trustedId}) AS what_happends_to_account_give_account_id
          FROM trusted WHERE trusted_id=${body.trustedId} AND user_id=${body.userId};`
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
