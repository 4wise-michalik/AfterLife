const { convertCalendarToDate, convertCalendarToObj } = convertCalendar();

export const getPosts = async (userId) => {
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
