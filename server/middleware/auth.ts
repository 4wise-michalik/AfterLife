import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const authToken = getHeader(event, "authorization");
  console.log(authToken);

  // try {
  //   const decodedToken = jwtDecode(authToken);
  //   const currentTime = Date.now() / 1000;

  //   const responseValidateToken = (
  //     await axios.post("/api/login/validateToken", {
  //       id: decodedToken.id,
  //       token: authToken,
  //     })
  //   ).data;

  //   // console.log(responseValidateToken);
  // } catch (error) {
  //   console.log(error);
  // }
});
