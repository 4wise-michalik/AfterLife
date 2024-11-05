import axios from "axios";
const { convertCalendarToDate, convertCalendarToObj } = convertCalendar();

export const getUserPlatforms = async (userId: any) => {
  try {
    const response = await axios.post("/api/platforms/getUserPlatforms", {
      userId: userId,
    });
    if (response.data.success) {
      response.data.data.forEach((element: any) => {
        if (element.what_happens_to_account_time != null) {
          element.what_happens_to_account_time = convertCalendarToObj(
            element.what_happens_to_account_time
          );
        }
      });

      sessionStorage.setItem(
        "userPlatforms",
        JSON.stringify(response.data.data)
      );
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return { success: false };
};
