/* Configurer le serveur */

// Importer les composants
let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");

// Importer les modules de gestion des routes
let front = require("./routes/front");
let api = require("./routes/api");

// Définir le port
let port = 8080;

// Initier le serveur
let app = express();

// Définir le dossier static de la partie frontend
app.use(express.static(path.join(__dirname, "clientPureJS")));

// Configurer body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Définir les routes
app.use("/", front);
app.use("/api", api);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Le serveur est lancé sur le port ${port}`);
});
