/**
 * Fetches the list of users who are trusted by the specified user.
 *
 * @param {number} userId - The ID of the user for whom the trusted users are being fetched.
 *
 * @returns {Promise<{ data: Ref<object|null>, error: Ref<string|null>, loading: Ref<boolean> }>}
 *          A promise that resolves to an object containing:
 *          - `data`: A reactive reference holding the list of trusted users (or null if no data).
 *          - `error`: A reactive reference holding an error message (if any).
 *          - `loading`: A reactive reference indicating whether the request is in progress.
 */
export const getTrusted = async (userId: number) => {
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
};

/**
 * Fetches the list of users who trust the specified user.
 *
 * @param {number} userId - The ID of the user for whom the trusting users are being fetched.
 *
 * @returns {Promise<{ data: Ref<object|null>, error: Ref<string|null>, loading: Ref<boolean> }>}
 *          A promise that resolves to an object containing:
 *          - `data`: A reactive reference holding the list of trusting users (or null if no data).
 *          - `error`: A reactive reference holding an error message (if any).
 *          - `loading`: A reactive reference indicating whether the request is in progress.
 */
export const getTrusting = async (userId: number) => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  try {
    const response = await $fetch(`/api/getTrustingUsers/${userId}`);
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
};
