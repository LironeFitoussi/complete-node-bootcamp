/* eslint-disable */
const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    console.log(res);
  } catch (err) {
    console.error(err.response.data);
  }
};

document.querySelector(".form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  login(email, password);
});
