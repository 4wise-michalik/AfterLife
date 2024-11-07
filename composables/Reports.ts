import axios from "axios";

/**
 * Reports a trusting relationship between two users and checks if the user should be marked as deceased.
 *
 * @param {number} trustingId - The ID of the user who is trusting the other user.
 *
 * @returns {Promise<void>} A promise that resolves when the reporting process is complete.
 */
export const report = async (trustingId: number) => {
  const trustedId = JSON.parse(sessionStorage.getItem("userData").toString())[0]
    .id;
  try {
    const response = await $fetch("/api/report", {
      method: "POST",
      body: {
        trustingId,
        trustedId,
      },
    });

    if (response.success) {
      console.log("Data updated successfully");
    } else {
      console.error("Error updating data:", response.error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  // Make sure to pass trustedId instead of userId to checkReport
  const reportResult = await checkReport(trustedId, trustedId);
  if (
    reportResult.data.value.total / reportResult.data.value.trusted_number >=
    0.75
  ) {
    await makeDeceased(trustedId); // Assuming makeDeceased uses trustedId
  }
};

/**
 * Checks the report status for a user and a trusted user, returning the report data.
 *
 * @param {number} userId - The ID of the user being reported on.
 * @param {number} trustedId - The ID of the user who is being trusted.
 *
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 *          A promise that resolves to an object containing:
 *          - `success`: A boolean indicating if the check was successful.
 *          - `data` (optional): The data returned from the check if successful.
 *          - `error` (optional): An error message if the check failed.
 */
export const checkReport = async (userId: number, trustedId: number) => {
  try {
    const response = await axios.post("/api/checkReport", {
      userId: userId,
      trustedId: trustedId,
    });

    if (response.data.success) {
      return { success: true, data: response.data.data[0] }; // Return data directly
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    console.error("Error:", err.message);
    return { success: false, error: err.message }; // Return error info for better error handling
  }
};
