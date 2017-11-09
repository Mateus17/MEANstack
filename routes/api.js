// Configuration du module
let express = require('express');
let router = express.Router();

// Configuration de la route principale => http://localhost:8080/api
router.get('/', (req, res, next) => {
    res.json({res: 'Bienvenue dans notre API'});
});

// Export du module
module.exports = router;