import axios from "axios";

export const changeWhatHappendsToAccount = async (userId, platformId, whatHappendsToAccount) => {
  try {
    const response = await axios.post("/api/platforms/changeWhatHappendsToAccount", {
      userId: userId,
      platformId: platformId,
      whatHappendsToAccount: whatHappendsToAccount,
    });
    if (response.data.success) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
