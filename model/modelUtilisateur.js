// utilisation du module et tentative de connexion
// const nano = require('nano')('http://louna:Mcblbou81120*@127.0.0.1:5984');
const nano = require("nano")(
  "http://desouttter_hiker:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984",
);
let dbUtils = nano.db.use("desouttter_hiker_utilisateurs");

// choix d’une base de données
// let dbUtils = nano.db.use('utilisateurs');

const listeUtilisateur = async () => {
  const query = {
    selector: {},
    fields: [],
  };
  let utilisateurs = await dbUtils.find(query);
  console.log(utilisateurs);
  return utilisateurs.docs;
};

const descriptionUtilisateur = async (idUtils) => {
  const query = {
    selector: { id_util: parseInt(idUtils) },
    fields: ["pseudo", "mdp", "email", "liste_perso"],
  };
  let utilisateur = await dbUtils.find(query);
  console.log(utilisateur);
  return utilisateur.docs;
};

const listeUtilPerso = async (idUtils) => {
  const query = {
    selector: { id_util: parseInt(idUtils) },
    fields: ["liste_perso"],
  };
  let utilisateur = await dbUtils.find(query);
  console.log(utilisateur);
  return utilisateur.docs;
};

const ajoutUtil = async (body) => {
  const utilisateur = body;
  let newutil = await dbUtils.insert(utilisateur);
  console.log(newutil);
  return newutil;
};

module.exports = {
  listeUtilisateur,
  descriptionUtilisateur,
  listeUtilPerso,
  ajoutUtil,
};
