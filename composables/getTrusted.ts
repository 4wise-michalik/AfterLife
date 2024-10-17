export const getTrusted = async (userId) => {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(true);
    try {
        const response = await $fetch(`/api/getTrustedUsers/${userId}`);
        if (response.success) {
            data.value = response.data;
        } else {
          throw new Error(response.error);
        }
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
      return { data, error, loading };
  }