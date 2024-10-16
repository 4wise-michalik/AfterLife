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
  let pool;
  try {
    // Tworzenie połączenia z bazą danych
    pool = await sql.connect(config);

    // Wykonanie zapytania
    const result = await pool.request().query('SELECT * FROM users');
    // Zwracanie wyników zapytania
    return {
      success: true,
      data: result.recordset,
    };
  } catch (error) {
    // Obsługa błędów
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
