const express = require("express");

const app = express();
app.use(express.json());
const route = require("./router/router.js");
app.use(route.routerUtilisateurs);
app.use(route.routerGrades);
app.use(route.ElementsRouter);
app.use(route.DuelRouter);
app.get("/", function (req, res) {
  res.send("Hello Worlddddd2!");
});

app.listen(process.env.ENV, () => {
  console.log("Server started");
});
