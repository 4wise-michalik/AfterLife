import nodemailer from "nodemailer";
import { readBody } from "h3";
import mysql from "mysql2/promise";
const config = {
  host: process.env.MARIA_DB_HOST,
  user: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASSWORD,
  database: process.env.MARIA_DB_DATABASE,
  port: 3306,
};
const gmailConfig = {
  userName: process.env.GMAIL_NAME,
  password: process.env.GMAIL_PASSWORD,
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let connection;

  try {
    // generates verification code
    const generatedCode = (Math.floor(Math.random() * 899999) + 100000).toString();

    // sends email with verification code
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailConfig.userName,
        pass: gmailConfig.password,
      },
    });
    const mailConfiguration = {
      from: "mirekmich19@gmail.com",
      to: `${body.email}`,
      subject: "Verification code",
      html: `<div style='display: grid;'>  
            <p style='font-size: 25px; margin: 5px; text-align: center;'>Here's your AfterLife verification code!</p>
            <p style='font-size: 20px; margin: 5px; text-align: center;'>Continue signing up for AfterLife account by entering the code below:</p>  
            <p style='font-size: 25px; margin: 5px; text-align: center; font-weight:bold;'>${generatedCode}</p>  
            </div>`,
    };
    transporter.sendMail(mailConfiguration);

    // saves verification code in database
    connection = await mysql.createConnection(config);
    await connection.query("REPLACE INTO verification_codes (user_id, code) VALUES (?, ?)", [body.userId, generatedCode]);
  } catch (error) {
    console.error("Error sending mail:", error);
    return { success: false, error: "Error sending mail" };
  } finally {
    if (connection) await connection.end();
  }
});
