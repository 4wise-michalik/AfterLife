export const sessionGetUserData = () => {
  return JSON.parse(sessionStorage.getItem("userData"))[0];
};

export const sessionGetPosts = async () => {
  const posts = ref(null);
  const userData = sessionGetUserData();

  posts.value = JSON.parse(sessionStorage.getItem("posts"));
  if (!posts.value) {
    posts.value = await getPosts(userData.id);
    sessionStorage.setItem("posts", JSON.stringify(posts.value));
    return posts.value;
  } else {
    return posts.value;
  }
};

export const sessionGetPlatforms = async () => {
  const platforms = ref(null);
  const userData = sessionGetUserData();

  platforms.value = JSON.parse(sessionStorage.getItem("userPlatforms"));

  if (!platforms.value) {
    platforms.value = await getUserPlatforms(userData.id);
    sessionStorage.setItem("userPlatforms", JSON.stringify(platforms.value));
    return platforms.value;
  } else {
    return platforms.value;
  }
};
