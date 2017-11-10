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
}
