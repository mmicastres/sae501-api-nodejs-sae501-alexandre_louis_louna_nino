const express = require("express");
const PersoRouter = express.Router();

const controllerPerso = require("../controller/controllerPerso.js");

PersoRouter.get("/personnages", controllerPerso.perso);
PersoRouter.get("/personnages/:idPerso", controllerPerso.afficherPerso);


module.exports={PersoRouter}