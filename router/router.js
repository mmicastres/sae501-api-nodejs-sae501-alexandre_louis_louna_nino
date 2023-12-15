const express = require("express");
const ElementsRouter = express.Router();

const controllerElements = require("../controller/controllerElements.js");

ElementsRouter.get("/elements/:idElement", controllerElements.afficherElement);


module.exports={ElementsRouter}