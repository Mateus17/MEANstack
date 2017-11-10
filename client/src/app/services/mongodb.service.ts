import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Headers } from "@angular/http";
import "rxjs/add/operator/toPromise";

const apiUrl = "http://localhost:8080";

@Injectable()
export class MongodbService {
  constructor(
    // Initialisation du client HTTP
    private http: Http
  ) {}

  // Définition des adresses de l'API => routes/api.js
  private getTasksUrl = `${apiUrl}/api/tasks`;
  private editTaskUrl = `${apiUrl}/api/task`;

  // Requête GET
  private getAllTasks(): Promise<any[]> {
    // Récupérer les données depuis la BDD MongoDb
    return this.http
      .get(this.getTasksUrl)
      .toPromise()
      .then(this.dataFromMongodb)
      .catch(this.handleError);
  }

  // Requ$ete POST
  private addNewTask(newTask): Promise<any[]> {
    // Définition du header de la requête
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    // Ajout de la tâche dans la BDD MongoDb
    return this.http
      .post(this.editTaskUrl, newTask, { headers: myHeader })
      .toPromise()
      .then(this.dataFromMongodb)
      .catch(this.handleError);
  }

  // Requête PUT
  private updateTask(task): Promise<any[]> {
    // Définition du header de la requête
    let headers = new Headers();
    headers.append("Content-type", "application/json");

    // Mise à jour de la tâche dans la BDD MongoDb
    return this.http
      .put(`${this.editTaskUrl}/${task._id}`, task, { headers: headers })
      .toPromise()
      .then(this.dataFromMongodb)
      .catch(this.handleError);
  }

  // Requête DELETE
  private deleteTask(id): Promise<any[]> {
    // Suppresion de la tâche de la BDD MongoDb
    return this.http
      .delete(`${this.editTaskUrl}/${id}`)
      .toPromise()
      .then(this.dataFromMongodb)
      .catch(this.handleError);
  }

  // Return data
  private dataFromMongodb(res: Response) {
    return res.json() || {};
  }

  // Return error
  private handleError(error: any) {
    let errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : "Server error";
    return Promise.reject(errMsg);
  }
}
