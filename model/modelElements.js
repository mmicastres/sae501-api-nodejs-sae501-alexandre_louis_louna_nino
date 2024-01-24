const nano = require("nano")(
  "http://desouttter_hiker:Pb70e3c7@couchdb-desouttter.alwaysdata.net:5984",
);
const dbElements = nano.db.use("desouttter_hiker_elements");

//liste de tous les elements
const elements = async () => {
  const query = {
    selector: {},
    fields: ["titre"],
  };
  console.log(query);
  let element = await dbElements.find(query);
  return element.docs;
};

//details d'un element
const afficherElement = async (elementId) => {
  const query = {
    selector: { id_element: parseInt(elementId) },
    fields: ["elementId", "titre", "img_fond", "img_icon"],
  };
  let element = await dbElements.find(query);
  return element.docs[0];
};

module.exports = {
  elements,
  afficherElement,
};
