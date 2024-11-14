import { ref } from "vue";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

/**
 * Checks if given email and password are correct
 *
 * @param {string} email - The email address provided by user.
 * @param {string} password - The password provided by user.
 *
 * @returns { loggedIn: object, error: string } - An object indicating with query params.
 */
export const userLogIn = async (email: string, password: string) => {
  const error = ref(null);
  try {
    const responseUserData = (
      await axios.post("/api/login/signIn", {
        email: email,
        password: password,
      })
    ).data;

    sessionStorage.setItem("authToken", JSON.stringify(responseUserData.token));

    return { success: responseUserData.success };
  } catch (err) {
    error.value = err.message;
  }
  return { loggedIn: null, error };
};

/**
 * Adds new user to the database.
 *
 * @param {string} name - The name provided by new user.
 * @param {string} surname - The surname provided by new user.
 * @param {string} email - The email address provided by new user.
 * @param {string} password - The password provided by new user.
 *
 * @returns { loggedIn: object, error: string } - An object indicating with query params.
 */
export const userSignUp = async (name: string, surname: string, email: string, password: string) => {
  const error = ref(null);
  try {
    const responseUserData = await axios.post("/api/login/signUp", {
      name: name,
      surname: surname,
      email: email,
      password: password,
    });

    return responseUserData.data;
  } catch (err) {
    error.value = err.message;
  }
  return { error };
};

/**
 * Get user's infomation
 *
 * @param {string} email - The email address provided by new user.
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
  return { error };
};

/**
 * Gets all user's friend codes.
 *
 * @returns { codes: object, error: string, loading: boolean } - An object with query params.
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

/**
 * Checks if the auth token exists and if is still valid.
 *
 * @returns { valid: boolean } - An object indicating if the token is still valid.
 */
export const isAuthTokenValid = () => {
  const authToken = sessionStorage.getItem("authToken");
  try {
    const decodedToken = jwtDecode(authToken);
    const currentTime = Date.now() / 1000;

    if (authToken && decodedToken.exp > currentTime && decodedToken.id == sessionGetUserData().id) {
      return { valid: true };
    } else {
      localStorage.removeItem("authToken");
      return { valid: false };
    }
  } catch (error) {
    localStorage.removeItem("authToken");
    return { valid: false };
  }
};
