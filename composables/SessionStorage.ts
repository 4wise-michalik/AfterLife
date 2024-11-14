export const sessionGetUserData = () => {
  return JSON.parse(sessionStorage.getItem("userData"));
};

export const sessionSetUserData = async (email) => {
  const userData = (await getUsersInfo(email)).data[0];
  sessionStorage.setItem("userData", JSON.stringify(userData));
};
