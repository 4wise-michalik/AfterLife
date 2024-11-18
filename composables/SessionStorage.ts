import { jwtDecode } from "jwt-decode";

export const sessionGetUserData = () => {
  try {
    const authToken = JSON.parse(sessionStorage.getItem("authToken"));
    const decodedToken = jwtDecode(authToken);

    return decodedToken;
  } catch (error) {
    // sessionStorage.removeItem("authToken");
    // return navigateTo("/login");
  }
};
