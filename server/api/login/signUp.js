import mysql from "mysql2/promise";
import { getUsersCodes } from "~/composables/Users";
const config = {
  host: process.env.MARIA_DB_HOST,
  user: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASSWORD,
  database: process.env.MARIA_DB_DATABASE,
  port: 3306,
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let connection;
  let code = "";
  let friend_codes = await getUsersCodes();
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  do {
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
  } while (friend_codes.includes(code));

  try {
    connection = await mysql.createConnection(config);
    const [users] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [body.email]
    );

    if (users.length === 0) {
      await connection.query(
        `INSERT INTO users (first_name, last_name, email, password, verified_email, verifing_method, friend_code) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          body.name,
          body.surname,
          body.email,
          body.password,
          0,
          body.verifingMethod,
          code,
        ]
      );
      return { success: true, message: "User registered successfully." };
    } else {
      return { success: false, message: "Given email is already used." };
    }
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: "Database connection failed",
    };
  } finally {
    if (connection) await connection.end();
  }
});
