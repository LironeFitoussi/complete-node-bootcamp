/* eslint-disable */
import "@babel/polyfill";
import { login, logout } from "./login.js";
import { displayMap } from "./mapbox.js";

// DOM ELEMENTS
const mapbox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");

// DELEGATION
if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", logout);
