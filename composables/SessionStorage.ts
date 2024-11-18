import { jwtDecode } from "jwt-decode";

export const sessionGetUserData = () => {
  const authToken = JSON.parse(sessionStorage.getItem("authToken"));
  const decodedToken = jwtDecode(authToken);

  return decodedToken;
};
