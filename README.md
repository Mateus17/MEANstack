# CMD Line
* Premier terminal
    * `npm install`
    * `npm start`
* Second terminal
    * `mongod --dbpath ./data` || `mongod`
* Troisième terminal
    * `mongo`
    * Si aucune collections :
        * `use tasks`
        * `db.list.insert([{title:"Installer MongoDB", isDone: false}, {title: "Configurer MongoDB", isDone: false}, {title:"Utiliser le shell MongoDB", isDone: false})]`
* Quatrième terminal (pour la version sans Angular)
    * `npm run babel-watch-pure-js`

# Commandes utiles pour MongoDB
* `show dbs`
* `db.list.find({isDone : false}).pretty()`