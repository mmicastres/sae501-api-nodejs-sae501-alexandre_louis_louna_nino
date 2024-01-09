const express = require("express");
const routerGrades = express.Router();
const routerUtilisateurs = express.Router();
const PersoRouter = express.Router();
const ElementsRouter = express.Router();

// Les grades
const controllerGrade = require("../controller/controllerGrades.js");
routerGrades.get("/grades", controllerGrade.liste);
routerGrades.get("/grades/:idgrade", controllerGrade.detail);
routerGrades.post("/grades", controllerGrade.ajout);

// Les utilisateurs
const controllerUtils = require("../controller/controllerUtilisateurs.js");
routerUtilisateurs.get("/utilisateurs", controllerUtils.liste);
routerUtilisateurs.get("/utilisateurs/:idutil", controllerUtils.detailUtil);

routerUtilisateurs.get(
  "/utilisateurs/:idutil/myperso",
  controllerUtils.detailPerso,
);
routerUtilisateurs.post("/utilisateurs", controllerUtils.ajout);

const controllerElements = require("../controller/controllerElements.js");

ElementsRouter.get("/elements", controllerElements.elements);
ElementsRouter.get("/elements/:idElement", controllerElements.afficherElement);

const controllerPerso = require("../controller/controllerPerso.js");

PersoRouter.get("/personnages", controllerPerso.perso);
PersoRouter.get("/personnages/:idPerso", controllerPerso.afficherPerso);
PersoRouter.post("/personnages", controllerPerso.ajouterPerso);
PersoRouter.put("/personnages", controllerPerso.modifierPerso);
PersoRouter.delete("/personnages/:idPerso", controllerPerso.supprimerPerso);

module.exports = {
  routerGrades,
  routerUtilisateurs,
  PersoRouter,
  ElementsRouter,
};
