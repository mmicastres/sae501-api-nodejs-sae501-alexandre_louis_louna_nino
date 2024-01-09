const express = require('express')

 /* Connexion à couchDb*/
// const nano = require("nano")("http://desouttter:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984");
// const test = nano.db.use("desouttter_hiker")

const app = express()
app.use(express.json())
const route =require("./router/router.js");
app.use(route.routerUtilisateurs)
app.use(route.routerGrades)


// Route de base
app.get('/', function (req, res) {
  res.send('Hello World!')
})


app.listen(8080, () => {
  console.log("Server started");
});