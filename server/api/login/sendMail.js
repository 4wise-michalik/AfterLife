import nodemailer from "nodemailer";
import { readBody } from "h3";
const config = {
  userName: process.env.GMAIL_NAME,
  password: process.env.GMAIL_PASSWORD,
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.userName,
      pass: config.password,
    },
  });

  const mailConfiguration = {
    from: "mirekmich19@gmail.com",
    to: `${body.email}`,
    subject: "Verification code",
    html: `<div style='display: grid;'>  
            <p style='font-size: 25px; margin: 5px; text-align: center;'>Here's your AfterLife verification code!</p>
            <p style='font-size: 20px; margin: 5px; text-align: center;'>Continue signing up for AfterLife account by entering the code below:</p>  
            <p style='font-size: 25px; margin: 5px; text-align: center; font-weight:bold;'>${body.code}</p>  
            </div>`,
  };

  transporter.sendMail(mailConfiguration);
});
