import axios from "axios";

export const managementPromoteToBFF = async (userId: Number, trustedId: Number, bffValue: boolean) => {
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
