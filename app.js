const express = require('express')

 /* Connexion à couchDb*/
const nano = require("nano")("http://desouttter:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984");
const test = nano.db.use("desouttter_hiker")

const app = express()

// Route de base
app.get('/', function (req, res) {
  res.send('Hello World!')
})

/* Test de routes avec couchDb (à adapter si besoin)*/

// app.get("/salut", async (req, res) => {
//     try {
//       // Récupérer tous les documents de la base de données "desouttter_test"
//       const allDocs = await test.list({ include_docs: true });
  
//       // Extraire les documents de la réponse
//       const documents = allDocs.rows.map(row => row.doc);
  
//       // Envoyer les documents en tant que réponse JSON
//       res.json({ documents });
//     } catch (error) {
//       console.error("Erreur lors de la récupération des documents :", error);
//       res.status(500).send("Erreur interne du serveur");
//     }
//   });
  
//   app.get("/salut2", async (req, res) => {
//     try {
//       // Document à insérer
//       const documentToInsert = {
//         "numlicence": 2345,
//         "nom": "Dupont",
//         "prenom": "Leon"
//       };
  
//       // Insérer le document dans la base de données
//       const responseInsert = await test.insert(documentToInsert);
  
//       // Récupérer la liste mise à jour des documents
//       const allDocs = await test.list({ include_docs: true });
  
//       // Extraire les documents de la réponse
//       const documents = allDocs.rows.map(row => row.doc);
  
//       // Envoyer les documents en tant que réponse JSON
//       res.json({ documents, responseInsert });
//     } catch (error) {
//       console.error("Erreur lors de l'insertion du document ou de la récupération des documents :", error);
//       res.status(500).send("Erreur interne du serveur");
//     }
//   });


// Connexion automatique au port de Alwaysdata
 app.listen(process.env.PORT, function () {
  console.log('Example app started!')
})
