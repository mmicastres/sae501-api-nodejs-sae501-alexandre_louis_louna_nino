const express = require('express')
const app = express()
app.use(express.json());
const ElementsRoutes =require("./router/router.js");
app.use(ElementsRoutes.ElementsRouter)


app.get('/', function (req, res) {
  res.send('Hello World!')
})


app.listen(8080, () => {
  console.log("Server started");
});

