import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html"
})
export class TaskItemComponent {
  // Récupération de la tâche depuis le composant home.Component
  @Input() task: any;

  // Création des événements pour renvoyer des données vers le composant home.component
  @Output() sendDeleteTask = new EventEmitter();
  @Output() sendUpdateTask = new EventEmitter();

  // Fonction pour supprimer une tâche
  private deleteTask = (event: any) => {
    // Renvoi de l'événement vers le composant home.component
    this.sendDeleteTask.emit(event);
  };

  // Création d'une fonction pour mettre à jour une tâche
  private updateTask = (event: any) => {
    // Renvoi de l'événement vers le composant home.component
    this.sendUpdateTask.emit(event);
  };
}
