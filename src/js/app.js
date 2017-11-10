fetch("/api/tasks", {
  method: "get"
})
  .then((response, err) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw `Erreur avec la requête API : ${response.statusText}`;
    }
  })
  .then(arrayOfTasks => {
    arrayOfTasks.map(elem => {
      componentTask(elem);
    });
  })
  .catch(err => {
    throw err;
  });

const componentTask = elem => {
  const tasksList = document.querySelector(".tasksList");
  const taskContainer = document.createElement("article");
  const taskTitleContainer = document.createElement("h2");
  const taskTitle = document.createTextNode(elem.title);

  taskContainer.id = `task-${elem._id}`;
  taskContainer.classList = `taskListItem list-group-item taskItemIsDone${elem.isDone}`;
  taskContainer.dataset.id = elem._id;
  taskContainer.dataset.taskIsDone = elem.isDone;

  taskContainer.appendChild(taskTitleContainer);
  taskTitleContainer.appendChild(taskTitle);
  tasksList.appendChild(taskContainer);

  handleClickTask(elem._id);
};

const taskAddForm = document.getElementById("addTaskForm");
const taskTitleInput = document.getElementsByName("title")[0];

taskAddForm.addEventListener("submit", evt => {
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
    })
      .then(newTask => newTask.json())
      .then(newTask => {
        componentTask(newTask);
      })
      .catch(err => {
        throw err;
      });
  } else {
    document.querySelector(".alert-danger").classList.remove("d-none");
  }
});

const handleClickTask = taskId => {
  document.getElementById(`task-${taskId}`).addEventListener("click", e => {
    e.stopPropagation(); // Ne fonctionne pas => à check
    const currentTask = document.getElementById(`task-${taskId}`);
    const taskIsDone = currentTask.dataset.taskIsDone;

    if (taskIsDone === "true") {
      currentTask.dataset.taskIsDone = false;
    } else {
      currentTask.dataset.taskIsDone = true;
    }

    fetch(`/api/task/${taskId}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: currentTask.childNodes[0].innerHTML,
        isDone: currentTask.dataset.taskIsDone
      })
    }).catch(err => {
      throw err;
    });
  });
};
