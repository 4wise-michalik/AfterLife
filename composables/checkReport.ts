import axios from "axios";

export const checkReport = async (userId, trustedId) => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  try {
    const response = await axios.post("/api/checkReport", {
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
