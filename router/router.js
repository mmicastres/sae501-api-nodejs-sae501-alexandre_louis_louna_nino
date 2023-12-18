const express = require("express");
const routerGrades = express.Router();

const controllerGrade = require("../controller/controllerGrades.js");

routerGrades.get("/grades", controllerGrade.liste);

routerGrades.get("/grades/:idgrade",controllerGrade.detail)

routerGrades.post("/grades",controllerGrade.ajout)

module.exports = { routerGrades}