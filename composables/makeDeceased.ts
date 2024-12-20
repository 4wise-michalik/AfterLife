/**
 * Changes users status if his death was confirmed
 *
 * @param {number} userId - User's ID, to determine the deceased person.
 */
export const makeDeceased = async (userId) => {
  const deceasedTime = new Date();
  try {
    const response = await $fetch("/api/makeDeceased", {
      method: "POST",
      body: {
        userId,
        deceasedTime,
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
};
