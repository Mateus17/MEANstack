import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./partials/footer/footer.component";
import { HeaderComponent } from "./partials/header/header.component";

// Importer le module Routing
import { Routing } from "./app.routing";

@NgModule({
  declarations: [AppComponent, HomeComponent, FooterComponent, HeaderComponent],
  imports: [BrowserModule, Routing],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
