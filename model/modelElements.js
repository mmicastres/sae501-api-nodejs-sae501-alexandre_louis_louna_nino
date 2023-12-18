const nano = require("nano")("http://lln4432a:Lel!ege2003!@localhost:5984");
const dbElements = nano.db.use('elements');

const elements = async () => {
  const query = {
    selector: {},
    fields: ["titre"],
  };
  console.log(query)
  let element = await dbElements.find(query);
  return element.docs;
};


const afficherElement = async (elementId) => {
  const query = {
      "selector": { "id_element": parseInt(elementId) },
      "fields": ["elementId", "titre", "img_fond", "img_icon"]
  }
  let biblio = await dbElements.find(query)
  return biblio.docs
}

module.exports = {
  elements,
  afficherElement
};