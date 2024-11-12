import axios from "axios";

/**
 * Promotes trusted person from standard to bff (best-friend-forever).
 *
 * @param {Number} userId - User's ID, to determine what user changed the settings.
 * @param {Number} trustedId - Trusted's ID, to determine what user was managed.
 * @param {Boolean} bffValue - Value which determines if the trusted person is being promoted or demoted from bff.
 *
 * @returns { success: boolean } - An object indicating whether the operation was successful or not.
 */
export const managementChangeBFF = async (userId: Number, trustedId: Number, bffValue: boolean) => {
  try {
    const response = await axios.post("/api/trustedManagement/changeBffStatus", {
      userId: userId,
      trustedId: trustedId,
      bffValue: bffValue,
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
 * Deletes person from user's trusted ones.
 *
 * @param {Number} userId - User's ID, to determine what user changed the settings.
 * @param {Number} trustedId - Trusted's ID, to determine what user was managed.
 *
 * @returns { success: boolean } - An object indicating whether the operation was successful or not.
 */
export const managementDeleteFromTrusted = async (userId: Number, trustedId: Number) => {
  try {
    const response = await axios.post("/api/trustedManagement/deleteFromTrusted", {
      userId: userId,
      trustedId: trustedId,
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
 * Adds person to user's trusted ones.
 *
 * @param {Number} userId - User's ID, to determine what user changed the settings.
 * @param {Number} trustedId - Trusted's ID, to determine what user was managed.
 *
 * @returns { success: boolean } - An object indicating whether the operation was successful or not.
 */
export const managementAddToTrusted = async (userId: Number, trustedId: Number) => {
  try {
    const response = await axios.post("/api/trustedManagement/addToTrusted", {
      userId: userId,
      trustedId: trustedId,
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
 * Checks if any user has given friend code.
 *
 * @param {String} friendCode - Friend code to check.
 *
 * @returns { success: boolean, data: object } - An object indicating whether the operation was successful or not and code owner's ID.
 */
export const validateFriendCode = async (friendCode: String) => {
  try {
    const response = await axios.post("/api/trustedManagement/validateFriendCode", {
      friendCode: friendCode,
    });

    if (response.data.success && response.data.data[0]) {
      return { success: true, data: response.data.data[0] };
    } else {
      return { success: false, data: {} };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
