const nano = require("nano")(
  "http://desouttter_hiker:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984",
);
let dbDuel = nano.db.use("desouttter_hiker_duel");
let dbUtils = nano.db.use("desouttter_hiker_utilisateurs");
const dbElements = nano.db.use("desouttter_hiker_elements");

const ajoutDuel = async () => {
  const duel = body;
  let newduel = await dbDuel.insert(duel);
  console.log(newduel);
  return newduel;
};

module.exports = {
  ajoutDuel,
};
