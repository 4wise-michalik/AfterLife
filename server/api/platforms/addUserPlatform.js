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

  try {
    pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(
        `INSERT INTO connected_platforms (user_id, platform_id, email, password) VALUES (${body.userId}, ${body.platformId}, '${body.login}', '${body.password}');`
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
