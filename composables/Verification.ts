import axios from "axios";

/**
 * Checs if verification code is valid.
 *
 * @param {string} email - The email address to which the verification code will be sent.
 * @param {number} verificationCode - The verification code entered by user.
 *
 * @returns {{ success: boolean }} Statsu indicating whether code was valid or not.
 */
export const verifyVerificationCode = async (email: string, verificationCode: number) => {
  try {
    const response_userData = await axios.post("/api/login/getUserInfo", {
      email: email,
    });
    const userId = response_userData.data.data[0].id;

    const response = await axios.post("/api/login/verifyVerificationCode", {
      userId: userId,
      verificationCode: verificationCode,
    });

    if (response.data.success) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error in verification code:", error);
  }
};

/**
 * Sends the generated verification code to the specified email address.
 *
 * @param {string} email - The email address to which the verification code will be sent.
 *
 * @returns {Promise<void>} A promise that resolves once the email has been sent (or fails silently).
 */
export const sendVerificationCode = async (email: string) => {
  try {
    const response_userData = await axios.post("/api/login/getUserInfo", {
      email: email,
    });

    const userId = response_userData.data.data[0].id;

    const response = await axios.post("/api/login/sendMail", {
      email: email,
      userId: userId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
