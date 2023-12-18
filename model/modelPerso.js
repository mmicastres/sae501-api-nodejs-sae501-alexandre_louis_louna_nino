const nano = require("nano")("http://lln4432a:Lel!ege2003!@localhost:5984");
const dbPerso = nano.db.use('personnages');

const Joi = require('joi')

const persoSchema = Joi.object({
    _id: Joi.string(),
    _rev: Joi.string(),
    id_perso: Joi.number().required(),
    nom: Joi.string().required(),
    img_preview: Joi.string().required(),
    img_carte: Joi.string().required(),
    deverouiller: Joi.boolean().required(),
});
module.exports = { persoSchema };

const perso = async () => {
  const query = {
    selector: {},
    fields: [],
  };
  console.log(query)
  let perso = await dbPerso.find(query);
  return perso.docs;
};

const afficherPerso = async (persoId) => {
  const query = {
      "selector": { "id_perso": parseInt(persoId) },
      "fields": []
  }
  let perso = await dbPerso.find(query)
  return perso.docs
}

const ajouterPerso = async (nouveauPerso) => {
    const { value, error } = persoSchema.validate(nouveauPerso);
    if (error) {
      throw new Error(error.message);
    } else {
      const response = await dbPerso.insert(nouveauPerso);
      return { id: response.id };
    }
  };


module.exports = {
  perso,
  afficherPerso,
  ajouterPerso
};