import { ref } from "vue";
export const getUsersCodes = async () => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  const codes = ref([]);
  try {
    const response = await $fetch(`/api/login/getUsers`);
    if (response.success) {
      data.value = response.data;

      for (let i in data.value) {
        codes.value.push(data.value[i].friend_code);
      }
      return codes.value;
    } else {
      throw new Error(response.error);
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
  return { codes, error, loading };
};
