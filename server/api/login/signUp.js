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

  // resetowanie hasła
  
  try {
    pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM users WHERE email='${body.email}'`);
    if (result.rowsAffected[0] === 0){
      const resultInsert = await pool.request().query(`INSERT INTO users (first_name, last_name, email, password, verified_email, verifing_method) VALUES ('${body.name}', '${body.surname}', '${body.email}', '${body.password}', 0, ${body.verifingMethod})`);
      return { success: true, message: "given email was already used" };
    }
    else {
      return { success: false, message: "given email was already used" };
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
