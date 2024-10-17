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
    const userId = event.context.params.id;
    let pool;
    try {
      pool = await sql.connect(config);
      const result = await pool.request()
        .input('userId', sql.Int, userId) // Przekazujemy userId jako parametr
        .query('SELECT COUNT(*) AS total FROM trusted WHERE reported = 1 AND user_id = @userId');
        
      return {
        success: true,
        data: result.recordset[0].total,
      };
    } catch (error) {
      console.error('Database error:', error);
      return {
        success: false,
        error: 'Database connection failed',
      };
    } finally {
      if (pool) await pool.close();
    }
  });
  