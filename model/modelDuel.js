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

const responseDuel = async () => {};

const getDuels = async () => {
  const query = {
    selector: {},
    fields: [],
  };
  let duel = await dbDuel.find(query);
  return duel.docs;
};

// Obtenir les informations sur un duel
const updateDuel = async (duel) => {
  // const
  // const query = {
  //   selector: { id_duel: parseInt(idDuel) },
  //   fields: [],
  // };

  // let perso = await dbDuel.find(query);
  // return perso.docs;
  // console.log("duel");

  return duel;
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

module.exports = {
  ajoutDuel,
  getDuels,
  updateDuel,
  deleteDuel,
  maxId
};
