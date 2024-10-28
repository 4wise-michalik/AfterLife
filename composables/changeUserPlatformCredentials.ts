import axios from "axios";

export const changeUserPlatformCredentials = async (userId, platformId, login, password) => {
  try {
    const response = await axios.post("/api/platforms/changeUserPlatformCredentials", {
      userId: userId,
      platformId: platformId,
      login: login,
      password: password,
    });
    if (response.data.success) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
