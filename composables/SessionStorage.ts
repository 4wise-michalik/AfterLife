import { jwtDecode } from "jwt-decode";

export const sessionGetUserData = () => {
  const authToken = JSON.parse(sessionStorage.getItem("authToken"));
  const decodedToken = jwtDecode(authToken);

  return decodedToken;
};

// export const sessionSetUserData = async (email: string) => {
//   const userData = (await getUsersInfo(email)).data[0];
//   sessionStorage.setItem("userData", JSON.stringify(userData));
// };
