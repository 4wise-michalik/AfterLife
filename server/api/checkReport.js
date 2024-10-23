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
  const body = await readBody(event); 

  let pool;
  try {
    pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT reported, (SELECT COUNT(*) AS total FROM trusted WHERE reported=1 AND user_id=${body.userId}) AS total FROM trusted WHERE trusted_id=${body.trustedId} AND user_id=${body.userId};`);
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

  // let pool;
  // try {
  //   pool = await sql.connect(config);
  //   const result = await pool.request()
  //     .input('userId', sql.Int, userId) // Przekazujemy userId jako parametr
  //     .input('trustedId', sql.Int, trustedId) // Przekazujemy trustedId jako parametr
  //     // .query('SELECT COUNT(*) AS total FROM trusted WHERE reported = 1 AND user_id = @userId');
  //     .query('SELECT reported, (SELECT COUNT(*) AS total FROM trusted WHERE reported=1 AND user_id = @userId) FROM trusted WHERE trusted_id = @trustedId AND user_id = @userId;');
      
  //   console.log(result.recordset[0].reported)
  //   return {
  //     success: true,
  //     reported: result.recordset[0].reported,
  //     data: result.recordset[0].total,
  //   };
  // } catch (error) {
  //   console.error('Database error:', error);
  //   return {
  //     success: false,
  //     error: 'Database connection failed',
  //   };
  // } finally {
  //   if (pool) await pool.close();
  // }
  });
  