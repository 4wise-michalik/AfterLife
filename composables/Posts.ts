import axios from "axios";

/**
 * Adds a post in the database
 *
 * @param {number} userId - User's ID, to determine the 'owner' of the post.
 * @param {number} platformId - Platform's ID, used to specify on which platform the post should be shared.
 * @param {string} content - Content of the post.
 * @param {object} time - An object containing values representing years, months, days, hours.
 *
 * @returns {{ success: boolean }} - An object indicating whether the deletion was successful.
 */
export const addPost = async (
  userId: number,
  platformId: number,
  content: string,
  time: object
) => {
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

/**
 * Updates a post in the database with the given id number.
 *
 * @param {number} postId - The ID of the post to be updated.
 * @param {string} content - The content of the post to be updated.
 * @param {object} time - An object containing values representing years, months, days, hours.
 *
 * @returns {{ success: boolean }} - An object indicating whether the deletion was successful.
 */
export const updatePost = async (
  postId: number,
  content: string,
  time: object
) => {
  try {
    const response = await axios.post("/api/platforms/updatePost", {
      postId: postId,
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

/**
 * Deletes a post in the database with the given id number.
 *
 * @param {number} postId - The ID of the post to delete.
 *
 * @returns {{ success: boolean }} - An object indicating whether the deletion was successful.
 */
export const deletePost = async (postId: number) => {
  try {
    const response = await $fetch(`/api/deletePost/${postId}`, {
      method: "DELETE",
    });
    if (response.success) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};

/**
 * Fetches posts for a given user by userId.
 *
 * @param {number} userId - The ID of the user for whom to fetch posts.
 *
 * @returns {{ data: Ref<null | Array<object>>, error: Ref<null | string>, loading: Ref<boolean> }}
 *          An object containing:
 *          - `data`: a ref containing an array of posts or `null` if no data.
 *          - `error`: a ref containing an error message string or `null` if no error.
 *          - `loading`: a ref indicating if the request is still loading.
 */
export const getPosts = async (userId: number) => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  try {
    const response = await $fetch(`/api/getPosts/${userId}`);
    if (response.success) {
      data.value = response.data;

      for (const index in data.value) {
        if (data.value[index].time != null) {
          data.value[index].time = convertCalendarToObj(data.value[index].time);
        }
      }
    } else {
      throw new Error(response.error);
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
  return { data, error, loading };
};
