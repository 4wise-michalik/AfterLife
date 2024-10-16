import sql from 'mssql';

// Konfiguracja połączenia z Azure SQL
const config = {
  user: process.env.AZURE_SQL_USER, // Użytkownik bazy danych
  password: process.env.AZURE_SQL_PASSWORD, // Hasło
  server: process.env.AZURE_SQL_SERVER, // Adres serwera
  database: process.env.AZURE_SQL_DATABASE, // Nazwa bazy danych
  options: {
    encrypt: true, // Wymagane przez Azure SQL
    trustServerCertificate: false,
  },
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Read the request body
  let pool;

  try {
    pool = await sql.connect(config);

    const result = await pool.request().query(`SELECT * FROM users WHERE email='${body.email}' AND password='${body.password}';`);
    
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
    // Zamykanie połączenia
    if (pool) pool.close();
  }
});
