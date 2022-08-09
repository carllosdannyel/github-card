const endPoint = "https://api.github.com/users/";

const githubAPI = async (user) => {
  const response = await fetch(`${endPoint}${user}`);
  return response.json();
};

export default githubAPI;