export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (user != null) {
    console.log("true???????");
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
