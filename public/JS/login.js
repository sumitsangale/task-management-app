import axios from "axios";
import { showAlert, showSpinner, hideSpinner } from "./alert";

let formSubmitted = false;

export const signup = async (data, url) => {
  try {
    if (formSubmitted) return;
    formSubmitted = true;
    showSpinner();

    const res = await axios({
      method: "POST",
      url,
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
    formSubmitted = false;
    hideSpinner();
  } catch (err) {
    hideSpinner();
    formSubmitted = false;
    showAlert("danger", err.response.data.message);
    console.log(err.response.data);
  }
};

export const logOut = async (e) => {
  try {
    e.preventDefault();
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (res.data.status === "success") location.reload(true);
  } catch (err) {
    showAlert("danger", "Error in logout! try again.");
  }
};
