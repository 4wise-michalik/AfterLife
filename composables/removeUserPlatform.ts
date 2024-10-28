import axios from "axios";

export const removeUserPlatform = async (userId, platformId) => {
  try {
    const response = await axios.post("/api/platforms/removeUserPlatform", {
      userId: userId,
      platformId: platformId,
    });
    if (response.data.success) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
