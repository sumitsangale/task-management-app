import "@babel/polyfill";
import { signup, logOut } from "./login";
import { taskAction } from "./taskaction";

//DOM Elements
const signupForm = document.querySelector(".signup_form");
const loginForm = document.querySelector(".login_form");
const logoutBtn = document.querySelector(".logout-btn");

const createTaskForm = document.querySelector(".createtask_form");
const editTaskForm = document.querySelector(".edit-task_form");
const deleteTaskBtn = document.querySelectorAll(".delete-task-btn");

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
    signup({ email, password }, "/api/v1/users/login");
  });
}

if (logoutBtn) logoutBtn.addEventListener("click", logOut);

if (createTaskForm) {
  createTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("createtaskName").value;
    const description = document.getElementById("createtaskDescription").value;
    console.log(name, description);
    taskAction({ name, description }, "/api/v1/tasks", "POST");
  });
}

if (editTaskForm) {
  editTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("edittaskName").value;
    const status = document.getElementById("edittaskStatus").value;
    const description = document.getElementById("edittaskDescription").value;
    const id = document.getElementById("edittaskId").value;
    console.log(name, status, description, id);
    taskAction({ name, description, status }, `/api/v1/tasks/${id}`, "PATCH");
  });
}

if (deleteTaskBtn && deleteTaskBtn.length > 0) {
  deleteTaskBtn.forEach((btn) => {
    btn.addEventListener("click", deleteTask);
  });
}

function deleteTask(e) {
  e.preventDefault();
  const id = e.target.dataset.taskId;
  if (!id) return;
  console.log("delete task", e.target.dataset.taskId);
  taskAction({}, `/api/v1/tasks/${id}`, "DELETE");
}
