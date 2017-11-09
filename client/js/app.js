"use strict";

var tasksUrl = "/api/tasks";

fetch(tasksUrl, {
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

  var task = document.createElement("div").innerHTML = "<article data-id=\"" + elem._id + "\" class=\"taskListItem list-group-item list-group-item-action\" data-task-is-done=" + elem.isDone + ">\n        <h2>" + elem.title + "</h2>\n    </article>";

  tasksList.innerHTML += task;
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