import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const token = sessionStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          sessionStorage.removeItem("authToken");
          return navigateTo("/");
        }
      } catch (error) {
        sessionStorage.removeItem("authToken");
        return navigateTo("/");
      }
    } else if (to.name !== "login") {
      return navigateTo("/login");
    }
  }
});
