import axios from "axios";

/**
 * Generates a 6-digit random verification code.
 *
 * @returns {Promise<string>} A promise that resolves to a string representing a randomly generated 6-digit code.
 */
export const generateVerificationCode = async () => {
  const generatedCode = (
    Math.floor(Math.random() * 899999) + 100000
  ).toString();
  return generatedCode;
};

/**
 * Sends the generated verification code to the specified email address.
 *
 * @param {string} email - The email address to which the verification code will be sent.
 * @param {string} generatedCode - The verification code to be sent to the email address.
 *
 * @returns {Promise<void>} A promise that resolves once the email has been sent (or fails silently).
 */
export const sendVerificationCode = async (
  email: string,
  generatedCode: string
) => {
  try {
    const response = await axios.post("/api/login/sendMail", {
      email: email,
      code: generatedCode,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
