import { Component, OnInit } from "@angular/core";
import { MongodbService } from "../../services/mongodb.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",

  // Ajout du service dans le tableau des providers
  providers: [MongodbService]
})
export class HomeComponent implements OnInit {
  constructor(
    // Ajouter le service dans le constructor
    private mongodbService: MongodbService
  ) {}

  // Fonction showTasks()
  private tasksCollection: any[];

  private showTasks = () => {
    // Appel de la fonction du service getAllTasks()
    this.mongodbService.getAllTasks().then(data => {
      // Callback => Injecter les données dans un tableau
      this.tasksCollection = data;
    });
  };

  // Fonction addNewTask()
  // La nouvelle tâche est passée en paramètre de la fonction.
  private addNewTask = (taskTitle: any) => {
    // Définition de l'objet newTask
    let newTask = {
      title: taskTitle,
      isDone: false
    };

    // Appel de la fonction du service addNewTask()
    this.mongodbService.addNewTask(newTask).then(mongoNewTask => {
      // Callback => Actualiser la liste des tâches
      this.showTasks();
    });
  };

  // Fonction updateTask()
  // La tâche à modifier est passée en paramètre de la fonction
  private updateTask = task => {
    // Définition d'une variable pour mettre à jour les données de la tâche
    let _task = {
      _id: task.id,
      title: task.title,
      isDone: !task.isDone
    };

    // Appel de la fonction du service updateTask()
    this.mongodbService.updateTask(_task).then(data => {
      // Callback => Actualiser la liste des tâches
      this.showTasks();
    });
  };

  // Fonction deleteTask()
  // L'id de la tâche à supprimer est passée en paramètre de la fonction
  private deleteTask = id => {
    // Appel de la fonction du service deleteTask()
    this.mongodbService.deleteTask(id).then(data => {
      // Callback => Actualiser la liste des tâches
      this.showTasks();
    });
  };

  ngOnInit() {
    this.showTasks();
  }
}
