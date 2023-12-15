const express = require('express')
const app = express()
app.use(express.json());
const ElementsRoutes =require("./sae501-api-nodejs-sae501-alexandre_louis_louna_nino/router/router.js");
app.use(ElementsRoutes.ElementsRouter)


app.get('/', function (req, res) {
  res.send('Hello World!')
})


app.listen(8080, () => {
  console.log("Server started");
});

