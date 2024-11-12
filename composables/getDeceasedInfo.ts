import axios from "axios";

/**
 * Gets info about deceased person.
 *
 * @param {number} userId - User's ID, to determine the deceased person.
 * @param {number} trustedId - Trusted's ID, because.
 *
 * @returns {{ data: object, error: String, loading: boolean }} - An object indicating with query params.
 */
export const getDeceasedInfo = async (userId, trustedId) => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  try {
    const response = await axios.post("/api/getDeceasedInfo", {
      userId: userId,
      trustedId: trustedId,
    });

    if (response.data.success) {
      data.value = response.data.data[0];
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
  return { data, error, loading };
};
