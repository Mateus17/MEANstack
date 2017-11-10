"use strict";

fetch("/api/tasks", {
  method: "get"
}).then(function (response, err) {
  if (response.status === 200) {
    return response.json();
  } else {
    throw "Erreur avec la requ\xEAte API : " + response.statusText;
  }
}).then(function (arrayOfTasks) {
  arrayOfTasks.map(function (elem) {
    componentTask(elem);
  });
}).catch(function (err) {
  throw err;
});

var componentTask = function componentTask(elem) {
  var tasksList = document.querySelector(".tasksList");
  var taskContainer = document.createElement("article");
  var taskTitleContainer = document.createElement("h2");
  var taskTitle = document.createTextNode(elem.title);

  taskContainer.id = "task-" + elem._id;
  taskContainer.classList = "taskListItem list-group-item taskItemIsDone" + elem.isDone;
  taskContainer.setAttribute("data-id", elem._id);
  taskContainer.setAttribute("data-task-is-done", elem.isDone);

  taskContainer.appendChild(taskTitleContainer);
  taskTitleContainer.appendChild(taskTitle);
  tasksList.appendChild(taskContainer);

  handleClickTask(elem._id);
};

var taskAddForm = document.getElementById("addTaskForm");
var taskTitleInput = document.getElementsByName("title")[0];

taskAddForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  // Vérifier la présence de valeur dans le formulaire
  if (taskTitleInput.value !== "") {
    document.querySelector(".alert-danger").classList.add("d-none");
    // Ajouter un document dans la collection MongoDb => post()
    fetch("/api/task", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: taskTitleInput.value
      })
    }).then(function (newTask) {
      return newTask.json();
    }).then(function (newTask) {
      componentTask(newTask);
    });
  } else {
    document.querySelector(".alert-danger").classList.remove("d-none");
  }
});

var handleClickTask = function handleClickTask(taskId) {
  document.getElementById("task-" + taskId).addEventListener("click", function (e) {
    e.stopPropagation(); // Ne fonctionne pas => à check
    var currentTask = document.getElementById("task-" + taskId);
    var taskIsDone = currentTask.dataset.taskIsDone;
    //currentTask.classList.toggle("taskItemIsDonetrue");
    //currentTask.classList.toggle("taskItemIsDonefalse");
    console.log(taskIsDone);
    if (taskIsDone) {
      console.log("trueee");
      currentTask.dataset.taskIsDone = false;
      //currentTask.setAttribute("data-task-is-done", false);
    } else {
      console.log("faaalse");
      currentTask.dataset.taskIsDone = true;
      //currentTask.setAttribute("data-task-is-done", true);
    }
  });
};