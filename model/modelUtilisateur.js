// utilisation du module et tentative de connexion
// const nano = require('nano')('http://louna:Mcblbou81120*@127.0.0.1:5984');
const nano = require("nano")(
  "http://desouttter_hiker:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984",
);
let dbUtils = nano.db.use("desouttter_hiker_utilisateurs");
let dbPerso = nano.db.use("desouttter_hiker_personnages");
const modelPerso = require("../model/modelPerso.js");

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
    fields: [],
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
  const defaultValues = {
    duel_gagne: 0,
    exp: 0,
    nbr_km_total: 0,
    nbr_km_today: 0,
    liste_perso: [],
  };
  const utilisateur = { ...defaultValues, ...body };
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
const connexionUtil = async (login) => {
  const query = {
    selector: { $or: [{ email: login }, { pseudo: login }] },
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

//modification kilometres
const modifkilo = async (id_util, body) => {
  const kilo = body;
  console.log(kilo);
  let modifUser = { ...kilo }; // Change const to let
  const query = {
    selector: { id_util: parseInt(id_util) },
    fields: [],
  };
  try {
    const result = await dbUtils.find(query);
    console.log("result", result);
    modifUser = {
      ...kilo,
      _id: result.docs[0]._id,
      _rev: result.docs[0]._rev,
      id_util: result.docs[0].id_util,
      duel_gagne: result.docs[0].duel_gagne,
      exp: result.docs[0].exp,
      liste_perso: result.docs[0].liste_perso,
      pseudo: result.docs[0].pseudo,
      mdp: result.docs[0].mdp,
      email: result.docs[0].email,
    };
    console.log("kilo", modifUser);

    let newutil = await dbUtils.insert(modifUser);
    // console.log(newutil);
    return newutil;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la modification de l'utilisateur");
  }
};

// ajoute +1 au nombre de duels gagnés
const incrementerDuelsGagnes = async (id_util) => {
  // console.log("id_util", id_util);
  try {
    const query = {
      selector: { id_util: parseInt(id_util) },
      fields: [],
    };

    const result = await dbUtils.find(query);
    // console.log(result);

    if (result.docs.length > 0) {
      const utilisateur = result.docs[0];
      utilisateur.duel_gagne = (utilisateur.duel_gagne || 0) + 1;

      await dbUtils.insert(utilisateur);
    } else {
      throw new Error("Utilisateur non trouvé");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de l'incrémentation des duels gagnés");
  }
};

// Gagner un personnage
const recevoirPersonnageAleatoire = async (id_util) => {
  const query = {
    selector: { id_util: parseInt(id_util) },
    fields: [],
  };
  try {
    // Récupérer la liste actuelle des personnages de l'utilisateur
    const utilisateur = await dbUtils.find(query);

    const listePersoActuelle = utilisateur.docs[0].liste_perso || [];

    const personnagesDisponibles = [];
    const allPerso = await modelPerso.perso();

    allPerso.map((perso) => {
      personnagesDisponibles.push(perso.id_perso);
    });

    const personnagesNonPossedes = personnagesDisponibles.filter(
      (perso) => !listePersoActuelle.includes(perso),
    );
    console.log("personnagesNonPossedes", personnagesNonPossedes);

    if (personnagesNonPossedes.length === 0) {
      console.error("Aucun personnage disponible à recevoir.");
      throw new Error("Aucun personnage disponible à recevoir.");
    }

    const personnageAleatoire =
      personnagesNonPossedes[
        Math.floor(Math.random() * personnagesNonPossedes.length)
      ];

    const newListPerso = utilisateur.docs[0].liste_perso;
    newListPerso.push(personnageAleatoire);
    // console.log("test", test);
    const modifUser = {
      ...utilisateur.docs[0],
      id_util: utilisateur.docs[0].id_util,
      _id: utilisateur.docs[0]._id,
      _rev: utilisateur.docs[0]._rev,
      liste_perso: newListPerso,
    };

    await dbUtils.insert(modifUser);
    return personnageAleatoire;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la réception d'un personnage aléatoire");
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
  modifkilo,
  maxId,
  incrementerDuelsGagnes,
  recevoirPersonnageAleatoire,
};
