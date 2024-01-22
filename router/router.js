const express = require("express");

const routerGrades = express.Router();
const routerUtilisateurs = express.Router();
const PersoRouter = express.Router();
const ElementsRouter = express.Router();
const DuelRouter = express.Router();

// les duels
const controllerDuel = require("../controller/contrellerDuel.js");
DuelRouter.post("/duel", controllerDuel.verifJTW, controllerDuel.duel);

// Les grades
const controllerGrade = require("../controller/controllerGrades.js");
routerGrades.get("/grades", controllerGrade.verifJTW, controllerGrade.liste);
routerGrades.get(
  "/grades/:idgrade",
  controllerGrade.verifJTW,
  controllerGrade.detail,
);
routerGrades.post("/grades", controllerGrade.verifJTW, controllerGrade.ajout);

// Les utilisateurs
const controllerUtils = require("../controller/controllerUtilisateurs.js");
routerUtilisateurs.get(
  "/utilisateurs",
  controllerUtils.verifJTW,
  controllerUtils.liste,
);
routerUtilisateurs.get(
  "/utilisateurs/:idutil",
  controllerUtils.verifJTW,
  controllerUtils.detailUtil,
);
routerUtilisateurs.get(
  "/utilisateurs/:idutil/myperso",
  controllerUtils.verifJTW,
  controllerUtils.detailPerso,
);
routerUtilisateurs.put(
  "/utilisateurs",
  controllerUtils.verifJTW,
  controllerUtils.modifierUtil,
);
routerUtilisateurs.delete(
  "/utilisateurs/:idutil",
  controllerUtils.verifJTW,
  controllerUtils.supprimerUtil,
);
// routerUtilisateurs.put(
//   "/utilisateurs/:idutil/myperso",
//   controllerUtils.verifJTW,
//   controllerUtils.modifierPerso,
// );
routerUtilisateurs.put(
  "/utilisateurs/:idutil/kilometres",
  controllerUtils.verifJTW,
  controllerUtils.modifkilometres,
);
routerUtilisateurs.post("/inscription", controllerUtils.ajout);
routerUtilisateurs.post("/connexion", controllerUtils.connexion);
routerUtilisateurs.put(
  "/utilisateurs/:idutil/victoire",
  controllerUtils.verifJTW,
  controllerUtils.incrementerDuels,
);

// //les elements
const controllerElements = require("../controller/controllerElements.js");
ElementsRouter.get(
  "/elements",
  controllerElements.verifJTW,
  controllerElements.elements,
);
ElementsRouter.get(
  "/elements/:idElement",
  controllerElements.verifJTW,
  controllerElements.afficherElement,
);

// //les personnages
const controllerPerso = require("../controller/controllerPerso.js");
PersoRouter.get(
  "/personnages",
  controllerPerso.verifJTW,
  controllerPerso.perso,
);
PersoRouter.get(
  "/personnages/:idPerso",
  controllerPerso.verifJTW,
  controllerPerso.afficherPerso,
);
PersoRouter.post(
  "/personnages",
  controllerPerso.verifJTW,
  controllerPerso.ajouterPerso,
);
PersoRouter.put(
  "/personnages",
  controllerPerso.verifJTW,
  controllerPerso.modifierPerso,
);
PersoRouter.delete(
  "/personnages/:idPerso",
  controllerPerso.verifJTW,
  controllerPerso.supprimerPerso,
);

module.exports = {
  routerGrades,
  routerUtilisateurs,
  PersoRouter,
  ElementsRouter,
};
