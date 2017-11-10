import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./partials/footer/footer.component";
import { HeaderComponent } from "./partials/header/header.component";

// Importer le module Routing
import { Routing } from "./app.routing";
import { AddTaskComponent } from './partials/add-task/add-task.component';
import { TaskItemComponent } from './partials/task-item/task-item.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, FooterComponent, HeaderComponent, AddTaskComponent, TaskItemComponent],
  imports: [BrowserModule, Routing],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
