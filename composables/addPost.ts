import axios from "axios";

export const addPost = async (userId, platformId, content, time) => {
  try {
    const response = await axios.post("/api/platforms/addPost", {
      userId: userId,
      platformId: platformId,
      content: content,
      time: time,
    });
    if (response.data.success) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};

export const updatePost = async (post_id, content, time) => {
  try {
    const response = await axios.post("/api/platforms/updatePost", {
      postId: post_id, // Użyj camelCase, aby zachować spójność
      content: content,
      time: time,
    });
    if (response.data.success) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
