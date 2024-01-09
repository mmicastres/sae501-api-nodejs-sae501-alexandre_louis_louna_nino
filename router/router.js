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


const ElementsRouter = express.Router();



const controllerElements = require("../controller/controllerElements.js");

ElementsRouter.get("/elements", controllerElements.elements);
ElementsRouter.get("/elements/:idElement", controllerElements.afficherElement);


const PersoRouter = express.Router();

const controllerPerso = require("../controller/controllerPerso.js");

PersoRouter.get("/personnages", controllerPerso.perso);
PersoRouter.get("/personnages/:idPerso", controllerPerso.afficherPerso);
PersoRouter.post("/personnages", controllerPerso.ajouterPerso);
PersoRouter.put("/personnages", controllerPerso.modifierPerso);
PersoRouter.delete("/personnages/:idPerso", controllerPerso.supprimerPerso);

module.exports = { routerGrades}
module.exports = { routerUtilisateurs}
module.exports={ElementsRouter}
module.exports={PersoRouter}