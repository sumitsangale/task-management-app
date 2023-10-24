export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

export const hideSpinner = () => {
  const el = document.querySelector(".spinner-ele");
  if (el) el.parentElement.removeChild(el);
};

//type is 'success' or 'danger' or 'warning'
export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert-${type}">${msg}</div>`;
  document
    .querySelector(".content-wraper")
    .insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};

export const showSpinner = () => {
  hideSpinner();
  const markup = `
  <div class="spinner-border spinner-ele" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  `;
  const el = document.querySelector(".form-wraper");
  if (el) el.insertAdjacentHTML("afterend", markup);
};
