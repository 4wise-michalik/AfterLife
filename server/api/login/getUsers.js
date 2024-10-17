import sql from 'mssql';
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
  let pool;
  try {
    pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM users');
    return {
      success: true,
      data: result.recordset,
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      success: false,
      error: 'Database connection failed',
    };
  } finally {
    if (pool) pool.close();
  }
});
