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

  // czy prawidłowy email
  // jakieś sprawdzenie czy w bazie już jest ten email
  // jak pojawi się błąd to niech coś napisze i nie puszcza dalej
  
  try {
    pool = await sql.connect(config);
    const result = await pool.request().query(`INSERT INTO users (first_name, last_name, email, password, verified, verifing_method) VALUES ('${body.name}', '${body.surname}', '${body.email}', '${body.password}', 0, ${body.verifingMethod})`);
    if (result.rowsAffected[0] === 0){
      return { success: false };
    }
    else {
      return { success: true };
    }
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
