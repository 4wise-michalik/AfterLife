import axios from "axios";

/**
 * Adds a message in the database
 *
 * @param {number} userId - User's ID, to determine the 'owner' of the message.
 * @param {number} platformId - Platform's ID, used to specify on which platform the message should be shared.
 * @param {string} content - Content of the message.
 * @param {object} time - An object containing values representing years, months, days, hours and minutes.
 *
 * @returns {{ success: boolean }} - An object indicating whether the deletion was successful.
 */
export const addMessage = async (userId: number, platformId: number, content: string, time: object) => {
  try {
    const response = await axios.post("/api/messages/addMessage", {
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
 * Updates a message in the database with the given id number.
 *
 * @param {number} messageId - The ID of the message to be updated.
 * @param {string} content - The content of the message to be updated.
 * @param {object} time - An object containing values representing years, months, days, hours and minutes.
 *
 * @returns {{ success: boolean }} - An object indicating whether the deletion was successful.
 */
export const updateMessage = async (messageId: number, content: string, time: object) => {
  try {
    const response = await axios.post("/api/messages/updateMessage", {
      messageId: messageId,
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
 * Deletes a message in the database with the given id number.
 *
 * @param {number} messageId - The ID of the message to delete.
 *
 * @returns {{ success: boolean }} - An object indicating whether the deletion was successful.
 */
export const deleteMessage = async (messageId: number) => {
  try {
    const response = await $fetch(`/api/messages/delMessage/${messageId}`, {
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
 * Fetches messages for a given user by userId.
 *
 * @param {number} userId - The ID of the user for whom to fetch messages.
 *
 * @returns {{ data: Ref<null | Array<object>>, error: Ref<null | string>, loading: Ref<boolean> }}
 *          An object containing:
 *          - `data`: a ref containing an array of messages or `null` if no data.
 *          - `error`: a ref containing an error message string or `null` if no error.
 *          - `loading`: a ref indicating if the request is still loading.
 */
export const getMessages = async (userId: number) => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  try {
    const response = await $fetch(`/api/messages/getMessages/${userId}`);
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
