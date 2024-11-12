import { ref } from "vue";
import axios from "axios";

/**
 * Checks if given email and password are correct
 *
 * @returns { loggedIn: object, error: string } - An object indicating with query params.
 */
export const userLogIn = async (email: string, password: string) => {
  const error = ref(null);
  try {
    const responseUserData = await axios.post("/api/login/signIn", {
      email: email,
      password: password,
    });

    const loggedIn = responseUserData.data;
    return loggedIn;
  } catch (err) {
    error.value = err.message;
  }
  return { loggedIn: null, error };
};

/**
 * Get user's infosssssssssssssssssssssssssssssssssssssssssssssss
 *
 * @returns { userInfo: object, error: string } - An object indicating with query params.
 */
export const getUsersInfo = async (email: string) => {
  const error = ref(null);
  try {
    const responseUserData = await axios.post("/api/login/getUserInfo", {
      email: email,
    });

    const userInfo = responseUserData.data;
    return userInfo;
  } catch (err) {
    error.value = err.message;
  }
  return { userInfo, error };
};

/**
 * Gets all user's friend codes.
 *
 * @returns { codes: object, error: string, loading: boolean } - An object indicating with query params.
 */
export const getUsersCodes = async () => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  const codes = ref([]);
  try {
    const response = await $fetch(`/api/login/getUsersCodes`);
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
