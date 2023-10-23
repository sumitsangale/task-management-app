import "@babel/polyfill";
import { signup, logOut } from "./login";

//DOM Elements
const signupForm = document.querySelector(".signup_form");
const loginForm = document.querySelector(".login_form");
const logoutBtn = document.querySelector(".logout-btn");

//Handlers
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const passwordConfirm = document.getElementById(
      "inputPasswordConfirm"
    ).value;
    signup({ name, email, password, passwordConfirm }, "/api/v1/users/signup");
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    console.log(email, password);
    signup({ email, password }, "/api/v1/users/login");
  });
}

if (logoutBtn) logoutBtn.addEventListener("click", logOut);
