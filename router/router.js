const express = require("express");
const routerUtilisateurs = express.Router();

const controllerUtils = require("../controller/controllerUtilisateurs.js");

routerUtilisateurs.get("/utilisateurs", controllerUtils.liste);

 routerUtilisateurs.get("/utilisateurs/:idutil",controllerUtils.detailUtil)

// routerUtilisateurs.post("/utilisateurs",controllerGrade.ajout)

module.exports = { routerUtilisateurs}