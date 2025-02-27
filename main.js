import renderHome from "./src/home.js";
import taskCreation from "./src/task.js";

var state = {
  page: "home",
  projects: [],
};

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function navigatePage(page) {
  state.page = page;
  renderContent();
}

//PROJECT MANAGEMENT

function createNewProject() {
  const newProjectEl = document.querySelector("#new-project");
  document.createElement("div").classList.add("newProject");

  const newProjForm = document.createElement("form");
  newProjectEl.appendChild(newProjForm);

  const newProjText = document.createElement("input");
  newProjText.id = "newProjectText";
  newProjText.type = "text";
  newProjText.setAttribute("minlength", "3");
  newProjText.required = true;
  newProjForm.appendChild(newProjText);

  const confirmProjText = document.createElement("input");
  confirmProjText.id = "confirmProject";
  confirmProjText.type = "submit";
  confirmProjText.value = "OK";
  newProjForm.appendChild(confirmProjText);

  const cancelProjText = document.createElement("input");
  cancelProjText.id = "cancelProject";
  cancelProjText.type = "submit";
  cancelProjText.value = "X";
  newProjForm.appendChild(cancelProjText);

  const confirmProjectBtn = document.querySelector("#confirmProject");
  const cancelProjectBtn = document.querySelector("#cancelProject");

  const confirmProjectCallback = (e) => {
    if (!newProjText.checkValidity()) newProjText.invalid();
    e.preventDefault();
    const projectName = document.querySelector("#newProjectText").value;
    addProject(projectName);
    confirmProjectBtn.removeEventListener("click", confirmProjectCallback);
    cancelProjectBtn.removeEventListener("click", cancelProjectCallback);
    newProjectEl.innerHTML = "";
  };

  const cancelProjectCallback = () => {
    confirmProjectBtn.removeEventListener("click", confirmProjectCallback);
    cancelProjectBtn.removeEventListener("click", cancelProjectCallback);
    newProjectEl.innerHTML = "";
  };

  confirmProjectBtn.addEventListener("click", confirmProjectCallback);
  cancelProjectBtn.addEventListener("click", cancelProjectCallback);
}

function renderProjects() {
  return state.projects
    .map((project) => {
      return `<div class="project-title-list"><li> ${project.title} </li> <button class="project-btn" id="btn-${project.id}"> X </button></div>`;
    })
    .reduce((acc, elm) => acc + elm, []);
}

function renderContent() {
  const projectListEl = document.querySelector("#project-list");
  projectListEl.innerHTML = renderProjects();
  state.projects.forEach((project) => {
    document
      .querySelector(`#btn-${project.id}`)
      .addEventListener("click", () => removeProject(project.id));
  });

  if (state.page == "home") {
    renderHome();

    const addTaskBtn = document.getElementById("addTaskBtn");
    addTaskBtn.addEventListener("click", () => {
      taskCreation();
    });
  }
}

const homeLink = document.querySelector("#homeLink");
homeLink.addEventListener("click", () => {
  renderContent();
});

function addProject(name) {
  state.projects.push({
    title: name,
    id: uuidv4(),
  });
  renderContent();
}

function removeProject(uuid) {
  state.projects = state.projects.filter((p) => p.id !== uuid);

  renderContent();
}

function startApp() {
  document
    .querySelector("#addProject")
    .addEventListener("click", createNewProject);
  renderContent();
  // addProject("dum");
  // addProject("random");
  // addProject("dee");
  // removeProject("dee");
  // removeProject("tweedle");
}

startApp();
