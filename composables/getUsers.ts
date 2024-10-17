export const getUsers = async () => {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(true);
    try {
        const response = await $fetch('/api/login/getUsers');
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