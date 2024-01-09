const express = require("express");
const PersoRouter = express.Router();

const controllerPerso = require("../controller/controllerPerso.js");

PersoRouter.get("/personnages", controllerPerso.perso);
PersoRouter.get("/personnages/:idPerso", controllerPerso.afficherPerso);
PersoRouter.post("/personnages", controllerPerso.ajouterPerso);
PersoRouter.put("/personnages", controllerPerso.modifierPerso);
PersoRouter.delete("/personnages/:idPerso", controllerPerso.supprimerPerso);

module.exports={PersoRouter}