const tasksUrl = "/api/tasks";

fetch(tasksUrl, {
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
    console.log(arrayOfTasks);
    arrayOfTasks.map(elem => {
      componentTask(elem);
    });
  })
  .catch(err => {
    console.error(err);
  });

const componentTask = elem => {
  const tasksList = document.querySelector(".tasksList");

  const task = (document.createElement(
    "div"
  ).innerHTML = `<article data-id="${elem._id}" class="taskListItem list-group-item list-group-item-action" data-task-is-done=${elem.isDone}>
        <h2>${elem.title}</h2>
    </article>`);

  tasksList.innerHTML += task;
  //console.log(elem);
};

const taskAddForm = document.getElementById("addTaskForm");
const taskTitleInput = document.getElementsByName("title")[0];

taskAddForm.addEventListener("submit", evt => {
  evt.preventDefault();

  // Vérifier la présence de valeur dans le formulaire
  if (taskTitleInput.value !== "") {
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
      //   .then(componentTask(res => res.json()))
      .then(newTask => newTask.json())
      .then(newTask => componentTask(newTask));
  } else {
    console.warn("lol");
  }
});
