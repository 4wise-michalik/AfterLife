import axios from "axios";

export const changeWhatHappendsToAccount = async (userId, platformId, whatHappendsToAccount, whatHappendsToAccountTime, whoToPassAccount) => {
  try {
    const response = await axios.post("/api/platforms/changeWhatHappendsToAccount", {
      userId: userId,
      platformId: platformId,
      whatHappendsToAccount: whatHappendsToAccount,
      whatHappendsToAccountTime: whatHappendsToAccountTime,
      whoToPassAccount: whoToPassAccount,
    });
    if (response.data.success) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
