// Importer les modules
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Importer le composant à utiliser dans la route
import { HomeComponent } from "./components/home/home.component";

// Création du tableau de routes
const appRoutes: Routes = [
  // Définition de la route principale
  {
    path: "",
    component: HomeComponent
  }
];

// Exporter le routing
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
