import axios from "axios";
import { showAlert } from "./alert";

export const signup = async (data, url) => {
  try {
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
  } catch (err) {
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
