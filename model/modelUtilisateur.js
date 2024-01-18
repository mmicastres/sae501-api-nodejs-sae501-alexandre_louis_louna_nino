// utilisation du module et tentative de connexion
// const nano = require('nano')('http://louna:Mcblbou81120*@127.0.0.1:5984');
const nano = require("nano")(
  "http://desouttter_hiker:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984",
);
let dbUtils = nano.db.use("desouttter_hiker_utilisateurs");

// choix d’une base de données
// let dbUtils = nano.db.use('utilisateurs');

//liste de tous les utilisateurs
const listeUtilisateur = async () => {
  const query = {
    selector: {},
    fields: [],
  };
  let utilisateurs = await dbUtils.find(query);
  console.log(utilisateurs);
  return utilisateurs.docs;
};

//details d'un utilisateur
const descriptionUtilisateur = async (idUtils) => {
  const query = {
    selector: { id_util: parseInt(idUtils) },
    fields: ["pseudo", "mdp", "email", "liste_perso"],
  };
  let utilisateur = await dbUtils.find(query);
  console.log(utilisateur);
  return utilisateur.docs;
};

//liste des personnages
const listeUtilPerso = async (idUtils) => {
  const query = {
    selector: { id_util: parseInt(idUtils) },
    fields: ["liste_perso"],
  };
  let utilisateur = await dbUtils.find(query);
  console.log(utilisateur);
  return utilisateur.docs;
};

//ajout d'un utilisateur
const ajoutUtil = async (body) => {
  const utilisateur = body;
  let newutil = await dbUtils.insert(utilisateur);
  console.log(newutil);
  return newutil;
};

// id le plus élevé
const maxId = async () => {
  try {
    const query = {
      selector: {},
      fields: ["id_util"],
      sort: [{ id_util: "desc" }],
      limit: 1,
    };

    const result = await dbUtils.find(query);

    if (result.docs.length > 0) {
      const maxId = result.docs[0].id_util;
      return maxId;
    } else {
      return 0;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération de l'id le plus élevé");
  }
};

//connexion
const connexionUtil = async (email) => {
  const query = {
    selector: { email },
    fields: ["pseudo", "mdp", "email", "liste_perso"],
  };

  try {
    const result = await dbUtils.find(query);
    return result.docs[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Vérifie si le pseudo existe déjà
const checkPseudoExists = async (pseudo) => {
  const query = {
    selector: { pseudo },
    fields: ["_id"],
  };

  try {
    const result = await dbUtils.find(query);
    return result.docs.length > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const supprimerUtil = async (id_util) => {
  const query = {
    selector: {
      id_util: parseInt(id_util, 10),
    },
    fields: ["_id", "_rev"],
  };

  const result = await dbUtils.find(query);

  if (result.docs.length > 0) {
    const perso = await dbUtils.get(result.docs[0]._id, {
      rev: result.docs[0]._rev,
    });
    await dbUtils.destroy(perso._id, perso._rev);
  } else {
    throw new Error("Utilisateur non trouvé");
  }
};

// Vérifie si l'email existe déjà
const checkEmailExists = async (email) => {
  const query = {
    selector: { email },
    fields: ["_id"],
  };

  try {
    const result = await dbUtils.find(query);
    return result.docs.length > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//modification d'un personnage
const modifierUtilisateur = async (body) => {
  const util = body;
  // console.log(util);
  const email = util.email;
  var modifUser = { ...util };
  const query = {
    selector: { email },
    fields: ["_id", "_rev"],
  };
  try {
    if (util.email) {
      const result = await dbUtils.find(query);
      // console.log(result);
      modifUser = {
        ...util,
        _id: result.docs[0]._id,
        _rev: result.docs[0]._rev,
      };
      console.log("user", modifUser);
    }
    let newutil = await dbUtils.insert(modifUser);
    // console.log(newutil);
    return newutil;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la modification de l'utilisateur");
  }
};

module.exports = {
  listeUtilisateur,
  descriptionUtilisateur,
  listeUtilPerso,
  ajoutUtil,
  connexionUtil,
  checkPseudoExists,
  checkEmailExists,
  modifierUtilisateur,
  supprimerUtil,
  maxId,
};
