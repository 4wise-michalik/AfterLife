import axios from "axios";

/**
 * Changes what happends to the account after user's death.
 *
 * @param {Number} userId - User's ID, to determine what user changed the settings.
 * @param {Number} platformId - Platform's ID, to determine in which of his platforms he wants to change settings.
 * @param {Number} whatHappendsToAccount - Information of what will happend to user's account after his death. 0-do notihng, 1-take over the account and preserve it, 2-take over the account and keep it alive, 3-take over the account and delete it, 4-take over the account and give it over to someone.
 * @param {Number} whatHappendsToAccountTime - Time after the choosen operation will be done.
 * @param {Number} whoToPassAccount - Person which will get credentials to the account (only if choosen).
 * @param {Number} message - Message attached to the credentials (only if choosen).
 *
 * @returns { success: boolean } - An object indicating whether the operation was successful or not.
 */
export const changeWhatHappendsToAccount = async (
  userId: Number,
  platformId: Number,
  whatHappendsToAccount: Number,
  whatHappendsToAccountTime: object,
  whoToPassAccount: Number,
  message: String
) => {
  try {
    const response = await axios.post("/api/platforms/changeWhatHappendsToAccount", {
      userId: userId,
      platformId: platformId,
      whatHappendsToAccount: whatHappendsToAccount,
      whatHappendsToAccountTime: whatHappendsToAccountTime,
      whoToPassAccount: whoToPassAccount,
      message: message,
    });
    if (response.data.success) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
