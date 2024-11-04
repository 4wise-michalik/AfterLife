export const makeDeceased = async (userId) => {
  console.log("zginął");
  try {
    const response = await $fetch("/api/killUser", {
      method: "POST",
      body: {
        userId,
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
