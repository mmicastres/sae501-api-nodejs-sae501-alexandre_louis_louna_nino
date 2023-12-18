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
  const element = await dbElements.get(elementId);
  return element;
};

const descriptionLivre = async (elementId) => {
  const query = {
      "selector": { "numero": parseInt(elementId) },
      "fields": ["titre", "resume", "auteur"]
  }
  let biblio = await dbLivres.find(query)
  console.log(biblio)
  return biblio.docs
}

module.exports = {
  elements,
  afficherElement
};