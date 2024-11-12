import axios from "axios";

/**
 * Fetches all platforms the user has added to their list, along with platform information.
 *
 * @param {number} userId - The ID of the user for whom to fetch platforms.
 *
 * @returns {Promise<{ success: boolean, data?: Array<object> }>}
 *          A promise that resolves to an object containing:
 *          - `success`: A boolean indicating if the fetch was successful.
 *          - `data` (optional): An array of platform objects with updated account times, if available.
 */
export const getUserPlatforms = async (userId: number) => {
  try {
    const response = await axios.post("/api/platforms/getUserPlatforms", {
      userId: userId,
    });

    if (response.data.success) {
      response.data.data.forEach((element: any) => {
        if (element.what_happens_to_account_time != null) {
          element.what_happens_to_account_time = convertCalendarToObj(element.what_happens_to_account_time);
        }
      });

      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return { success: false };
};

/**
 * Fetches all available platforms for a given user that are not yet added to their list.
 *
 * @param {number} userId - The ID of the user for whom to fetch available platforms.
 *
 * @returns {Promise<{ success: boolean, data?: Array<object> }>}
 *          A promise that resolves to an object containing:
 *          - `success`: A boolean indicating if the fetch was successful.
 *          - `data` (optional): An array of platform objects available to the user, if the fetch was successful.
 */
export const getUserAvaliablePlatforms = async (userId: number) => {
  try {
    const response = await axios.post("/api/platforms/getUserAvaliablePlatforms", {
      userId: userId,
    });

    if (response.data.success) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return { success: false };
};

/**
 * Removes a specified platform from the user's list of platforms.
 *
 * @param {number} userId - The ID of the user.
 * @param {number} platformId - The ID of the platform to remove.
 *
 * @returns {Promise<{ success: boolean }>}
 *          A promise that resolves to an object containing:
 *          - `success`: A boolean indicating if the removal was successful.
 */
export const removeUserPlatform = async (userId: number, platformId: number) => {
  try {
    const response = await axios.post("/api/platforms/removeUserPlatform", {
      userId: userId,
      platformId: platformId,
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
 * Adds a platform to the user's list of platforms with the provided login credentials.
 *
 * @param {number} userId - The ID of the user.
 * @param {number} platformId - The ID of the platform to add.
 * @param {string} login - The user's login for the platform.
 * @param {string} password - The user's password for the platform.
 *
 * @returns {Promise<{ success: boolean }>}
 *          A promise that resolves to an object containing:
 *          - `success`: A boolean indicating if the addition was successful.
 */
export const addUserPlatform = async (userId: number, platformId: number, login: string, password: string) => {
  try {
    const response = await axios.post("/api/platforms/addUserPlatform", {
      userId: userId,
      platformId: platformId,
      login: login,
      password: password,
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
 * Fetches the list of platforms available.
 *
 * @returns {Promise<{ success: boolean, data?: Array<object> }>}
 *          A promise that resolves to an object containing:
 *          - `success`: A boolean indicating if the fetch was successful.
 *          - `data` (optional): An array of platform objects if the fetch was successful.
 */
export const getPlatforms = async () => {
  try {
    const response = await axios.post("/api/platforms/getPlatforms");
    if (response.data.success) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};

/**
 * Changes the credentials (login and password) for a specified platform of the user.
 *
 * @param {number} userId - The ID of the user.
 * @param {number} platformId - The ID of the platform for which credentials are being changed.
 * @param {string} login - The new login for the platform.
 * @param {string} password - The new password for the platform.
 *
 * @returns {Promise<{ success: boolean }>}
 *          A promise that resolves to an object containing:
 *          - `success`: A boolean indicating whether the credential change was successful.
 */
export const changeUserPlatformCredentials = async (userId: number, platformId: number, login: string, password: string) => {
  try {
    const response = await axios.post("/api/platforms/changeUserPlatformCredentials", {
      userId: userId,
      platformId: platformId,
      login: login,
      password: password,
    });
    if (response.data.success) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
