const { elements } = require("./modelElements");

const nano = require("nano")(
  "http://desouttter_hiker:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984",
);
let dbDuel = nano.db.use("desouttter_hiker_duels");
let dbUtils = nano.db.use("desouttter_hiker_utilisateurs");
const dbElements = nano.db.use("desouttter_hiker_elements");

const ajoutDuel = async (body) => {
  const duel = body;
  console.log(duel);
  let newduel = await dbDuel.insert(duel);
  console.log(newduel);
  return newduel;
};

//const responseDuel = async () => { };

// Afficher la liste des duels
const getDuels = async () => {
  const query = {
    selector: {},
    fields: ["list_joueurs", "id_duel", "gagnant"],
  };
  let duel = await dbDuel.find(query);
  return duel.docs;
};

// Afficher un seul duel
const getDuel = async (idDuel) => {
  const query = {
    selector: { id_duel: parseInt(idDuel) },
    fields: ["list_joueurs", "id_duel", "gagnant"],
  };
  let duel = await dbDuel.find(query);
  if (duel.docs[0]) {
    return duel.docs[0];
  } else {
    return { message: "Ce duel n'existe pas" };
  }
};

// Mettre à jour un duel
const updateDuel = async (duelBody) => {
  var modifDuel = { ...duelBody };
  const query = {
    selector: { id_duel: parseInt(duelBody.id_duel) },
    fields: ["_id", "_rev"],
  };

  let duel = await dbDuel.find(query);
  // duelBody = {duelBody, duel.docs[0]}
  if (duel.docs[0]) {
    modifDuel = {
      ...modifDuel,
      _id: duel.docs[0]._id,
      _rev: duel.docs[0]._rev,
    };
    console.log(modifDuel);
    await dbDuel.insert(modifDuel);
    return true;
  } else {
    return false;
  }
};

// Supprimer un duel
const deleteDuel = async (idDuel) => {
  const query = {
    selector: {
      id_duel: parseInt(idDuel),
    },
    fields: ["_id", "_rev"],
  };

  const result = await dbDuel.find(query);

  if (result.docs.length > 0) {
    const duel = await dbDuel.get(result.docs[0]._id, {
      rev: result.docs[0]._rev,
    });
    await dbDuel.destroy(duel._id, duel._rev);
  } else {
    throw new Error("Duel non trouvé");
  }
};

// id le plus élevé des duels
const maxId = async () => {
  try {
    const query = {
      selector: {},
      fields: ["id_duel"],
      sort: [{ id_duel: "desc" }],
      limit: 1,
    };

    const result = await dbDuel.find(query);

    if (result.docs.length > 0) {
      const maxId = result.docs[0].id_duel;
      return maxId;
    } else {
      return 0;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération de l'id le plus élevé");
  }
};

// id le plus élevé des duels
const userDuel = async (body) => {
  // return body;
  const query = {
    selector: {
      gagnant: null,
      list_joueurs: {
        $elemMatch: {
          id_joueur: body.id_joueur,
          id_element: null,
        },
      },
    },
    fields: ["list_joueurs", "id_duel", "gagnant", "_id", "_rev"],
  };
  const result = await dbDuel.find(query);
  if (result.docs[0]) {
    return result.docs[0];
  } else {
    return null;
  }
};

// Mettre à jour un duel
const setElement = async (userDuel, body) => {
  var modifDuel = { ...userDuel };
  modifDuel.list_joueurs.forEach((joueur) => {
    if (joueur.id_joueur == body.id_joueur) {
      joueur.id_element = body.id_element;
    }
  });

  const result = await dbDuel.insert(modifDuel);
  return result;
};

module.exports = {
  ajoutDuel,
  getDuels,
  getDuel,
  updateDuel,
  deleteDuel,
  maxId,
  userDuel,
  setElement,
};
