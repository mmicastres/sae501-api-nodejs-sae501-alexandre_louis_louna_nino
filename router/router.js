const express = require("express");
const routerGrades = express.Router();

const controllerGrade = require("../controller/controllerGrades.js");

routerGrades.get("/grades", controllerGrade.liste);

routerGrades.get("/grades/:idgrade",controllerGrade.detail)

routerGrades.post("/grades",controllerGrade.ajout)



const routerUtilisateurs = express.Router();

const controllerUtils = require("../controller/controllerUtilisateurs.js");

routerUtilisateurs.get("/utilisateurs", controllerUtils.liste);

routerUtilisateurs.get("/utilisateurs/:idutil",controllerUtils.detailUtil)

routerUtilisateurs.get("/utilisateurs/:idutil/myperso",controllerUtils.detailPerso)

routerUtilisateurs.post("/utilisateurs",controllerUtils.ajout)

module.exports = { routerGrades}
module.exports = { routerUtilisateurs}