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
  const { userId } = body;

  console.log(userId);

  let pool;
  try {
    // Połącz się z bazą danych
    pool = await sql.connect(config);

    // Wykonaj zapytanie SQL do aktualizacji danych użytkownika
    const result = await pool.request().input("userId", sql.Int, userId).query(`
          UPDATE users 
          SET deceased=1
          WHERE id=@userId
        `);

    return {
      success: true,
      message: "User data updated successfully",
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: "Failed to update user data",
    };
  } finally {
    if (pool) pool.close();
  }
});
