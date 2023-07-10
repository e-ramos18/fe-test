import axios from "./axiosConfig";
import Cookies from "js-cookie";

export function doLogin(credentials) {
  return axios.post("/login", credentials).then((response) => {
    const token = response.data.token;
    const user = response.data.user;

    // Store the token securely in an HttpOnly cookie
    Cookies.set("token", token, { secure: true, sameSite: "strict" });

    // Serialize the user object as JSON and store it in a secure cookie
    Cookies.set("user", JSON.stringify(user), {
      secure: true,
      sameSite: "strict",
    });

    return response;
  });
}

// Function to make a registration request
export function doRegister(user) {
  return axios.post("/register", user);
}

// Function to make a logout request
export function doLogout() {
  return axios.post("/logout");
}

// Function to check if the user is logged in
export function isLoggedIn() {
  const token = Cookies.get("token");
  return !!token;
}

export function getCurrentUser() {
  const userCookie = Cookies.get("user");
  if (userCookie) {
    return JSON.parse(userCookie);
  } else {
    return null;
  }
}

// Function to check if the user is an admin
export function isAdmin(user) {
  return user && user.role === "admin";
}
