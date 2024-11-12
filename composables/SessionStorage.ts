export const sessionGetUserData = () => {
  return JSON.parse(sessionStorage.getItem("userData"));
};
