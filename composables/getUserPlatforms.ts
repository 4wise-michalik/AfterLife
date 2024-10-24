import axios from "axios";

export const getUserPlatforms = async (userId) => {
  try {
    const response = await axios.post("/api/platforms/getUserPlatforms", {
      userId: userId,
    });
    if (response.data.success) {
      sessionStorage.setItem(
        "userPlatforms",
        JSON.stringify(response.data.data)
      );
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
