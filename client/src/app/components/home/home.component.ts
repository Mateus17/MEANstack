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
    private mongoddbService: MongodbService
  ) {}

  ngOnInit() {}
}
