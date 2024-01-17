const nano = require("nano")(
  "http://desouttter_hiker:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984",
);
const dbPerso = nano.db.use("desouttter_hiker_personnages");

const perso = async () => {
  const query = {
    selector: {},
    fields: [],
  };
  console.log(query);
  let perso = await dbPerso.find(query);
  return perso.docs;
};

const afficherPerso = async (persoId) => {
  const query = {
    selector: { id_perso: parseInt(persoId) },
    fields: [],
  };
  let perso = await dbPerso.find(query);
  return perso.docs;
};

const ajouterPerso = async (body) => {
  const perso = body;
  let newperso = await dbPerso.insert(perso);
  console.log(newperso);
  return newperso;
};

const modifierPerso = async (body) => {
  const perso = body;
  try {
    let newperso = await dbPerso.insert(perso);
    console.log(newperso);
    return newperso;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la modification du personnage");
  }
};

const supprimerPerso = async (id_perso) => {
  const query = {
    selector: {
      id_perso: parseInt(id_perso, 10),
    },
    fields: ["_id", "_rev"],
  };

  const result = await dbPerso.find(query);

  if (result.docs.length > 0) {
    const perso = await dbPerso.get(result.docs[0]._id, {
      rev: result.docs[0]._rev,
    });
    await dbPerso.destroy(perso._id, perso._rev);
  } else {
    throw new Error("Personnage non trouvé");
  }
};

module.exports = {
  perso,
  afficherPerso,
  ajouterPerso,
  modifierPerso,
  supprimerPerso,
};
