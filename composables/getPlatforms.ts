import axios from "axios";

export const getPlatforms = async () => {
  try {
    const response = await axios.post("/api/platforms/getPlatforms");
    if (response.data.success) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
