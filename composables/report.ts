export const report = async (userId) => {
  const trustedId = JSON.parse(sessionStorage.getItem("userData").toString())[0].id;
  try {
    const response = await $fetch("/api/report", {
      method: "POST",
      body: {
        userId,
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

  const reportResult = await checkReport(userId, trustedId);
  if (reportResult.data.value.total / reportResult.data.value.trusted_number >= 0.75) {
    await makeDeceased(userId);
  }
};
