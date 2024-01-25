const nano = require("nano")(
  "http://desouttter_hiker:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984",
);
let dbDuel = nano.db.use("desouttter_hiker_duels");
let dbUtils = nano.db.use("desouttter_hiker_utilisateurs");
const dbElements = nano.db.use("desouttter_hiker_elements");

const ajoutDuel = async (body) => {
  const duel = body;
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
  return duel;
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

module.exports = {
  ajoutDuel,
  getDuels,
  updateDuel,
};
