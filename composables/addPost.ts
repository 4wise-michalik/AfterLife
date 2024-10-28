import axios from "axios";

export const addPost = async (userId, platformId, content, hours) => {
  try {
    const response = await axios.post("/api/platforms/addPost", {
      userId: userId,
      platformId: platformId,
      content: content,
      hours: hours,
    });
    if (response.data.success) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
