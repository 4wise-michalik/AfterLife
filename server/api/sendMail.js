import nodemailer from 'nodemailer';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event); // Read the request body

    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "mirekmich19@gmail.com",
            pass: "oyay ssin bgzb wstm"
        }
    })

    const mailConfiguration = {
        from: "mirekmich19@gmail.com", 
        to: "miroslaw.michalik@everyflow.pl", 
        subject: "Verification code", 
        html: `<div style='display: grid;'>  
            <p style='font-size: 25px; margin: 5px; text-align: center;'>Here's your AfterLife verification code!</p>
            <p style='font-size: 20px; margin: 5px; text-align: center;'>Continue signing up for AfterLife account by entering the code below:</p>  
            <p style='font-size: 25px; margin: 5px; text-align: center; font-weight:bold;'>${(body.body).substring(1,7)}</p>  
            </div>`
    }

    transporter.sendMail(mailConfiguration)
  })
  