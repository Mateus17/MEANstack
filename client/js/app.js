const tasksUrl = 'http://127.0.0.1:8080/api/tasks';

fetch(tasksUrl, {
    method: 'get'
}).then((response, err) => {
    if (response.status === 200) {
        return response.json();
    } else {
        throw `Erreur avec la requête API : ${response.statusText}`;
    }
}).then(arrayOfTasks => {
        console.log(arrayOfTasks);
        arrayOfTasks.map(elem => {
            componentTask(elem);
        })
    }
).catch(err => {
    console.error(err);
});

const componentTask = (elem) => {
    const tasksList = document.querySelector('.tasksList');
    
    const task = document.createElement('div').innerHTML =
    `<article data-id="${elem._id}" class="taskListItem taskIsDone${elem.isDone}">
        <h2>${elem.title}</h2>
    </article>`;

    tasksList.innerHTML += task;
    console.log(e);
}