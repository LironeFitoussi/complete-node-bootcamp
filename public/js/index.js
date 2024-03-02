/* eslint-disable */
import "@babel/polyfill";
import { login, logout } from "./login.js";
import { displayMap } from "./mapbox.js";
import { updateSettings } from "./updateSettings.js";
import { bookTour } from "./stripe.js";
// DOM ELEMENTS
const mapbox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const bookBtn = document.querySelector("#book-tour");
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

if (userDataForm) {
  userDataForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", e.target.name.value);
    form.append("email", e.target.email.value);
    form.append("photo", e.target.photo.files[0]);
    // console.log(form);
    updateSettings(form, "data");
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const saveButton = document.querySelector(".btn--save-password");
    saveButton.disabled = true;
    saveButton.textContent = "Updating...";
    const passwordCurrent = e.target.passwordCurrent.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );
    saveButton.textContent = "Password Updated Successfully";
    setTimeout(() => {
      saveButton.textContent = "Save Password";
      saveButton.disabled = false;
    }, 2000);
    userPasswordForm.reset();
  });
}

if (bookBtn) {
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
