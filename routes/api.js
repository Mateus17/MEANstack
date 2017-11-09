// Configuration du module
let mongodb = require('mongodb');

let ObjectId = mongodb.ObjectId;

let MongoClient = mongodb.MongoClient;

let mongodbUrl = 'mongodb://127.0.0.1:27017/tasks';

let express = require('express');
let router = express.Router();

// Configuration de la route principale => http://localhost:8080/api
router.get('/', (req, res, next) => {
    res.json({res: 'Bienvenue dans notre API'});
});

router.get('/tasks', (req, res, next) => {
    // Ouvrir une connexion sur la base MongoDb
    MongoClient.connect(mongodbUrl, (err, db) => {
        // Tester la connexion
        if (err) {
            console.log('nok', err);
        } else {
            // Récupération des documents de la collection 'list' => find
            db.collection('list').find().toArray((err, tasks) => {
                // Tester la commande MongoDb
                if (err) {
                    res.send(err);
                } else {
                    // Envoyer les données au format json
                    res.json(tasks);
                }
            });
        }
        db.close();
    });
});

// Export du module
module.exports = router;