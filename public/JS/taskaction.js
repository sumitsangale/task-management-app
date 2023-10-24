import axios from "axios";
import { showAlert, showSpinner, hideSpinner } from "./alert";

let formSubmitted = false;

export const taskAction = async (data, url, method) => {
  try {
    if (formSubmitted) return;
    formSubmitted = true;
    showSpinner();
    const res = await axios({
      method,
      url,
      data,
    });
    let infoText = "";
    if (method === "POST") {
      infoText = "created";
    } else if (method === "PATCH") {
      infoText = "edited";
    } else {
      infoText = "deleted";
    }
    console.log("delete res", res);
    if (res.data.status === "success" || res.status === 204) {
      showAlert("success", `Task ${infoText} successfully!`);
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
