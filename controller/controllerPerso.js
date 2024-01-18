const modelPerso = require("../model/modelPerso.js");
let jwt = require("jsonwebtoken");

const Joi = require("joi");

const persoSchema = Joi.object({
  _id: Joi.string(),
  _rev: Joi.string(),
  id_perso: Joi.number().required(),
  nom: Joi.string().required(),
  img_preview: Joi.string().required(),
  img_carte: Joi.string().required(),
});

function verifJTW(req, res, next) {
  let token = req.body.token || req.query.token;
  if (token) {
    jwt.verify(token, "clesecrete", function (err, payload) {
      if (err) {
        return res.json({
          satus: false,
          message: "token incorrect : " + err.message,
        });
      } else {
        req.payload = payload;
        next();
      }
    });
  } else {
    return res.status(403).send({
      status: false,
      message: "token absent",
    });
  }
}

module.exports = { persoSchema };

//liste de tous les personnages
const perso = async (req, res) => {
  try {
    const Perso = await modelPerso.perso();
    res.json(Perso);
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
};

//detail d'un personnage
const afficherPerso = async (req, res) => {
  const descriptionPerso = await modelPerso.afficherPerso(req.params.idPerso);
  if (descriptionPerso == 0) {
    res.status(404).json({ Erreur: "Le personnage n'existe pas" });
  }
  res.json(descriptionPerso);
};

//ajout d'un personnage
const ajouterPerso = async (req, res) => {
  const ajouterPerso = await modelPerso.ajouterPerso(req.body);
  const perso = req.body;
  const { value, error } = persoSchema.validate(perso);
  if (error == undefined) {
    console.log(ajouterPerso);
    res.send(" Ajout du personnage " + perso.nom);
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

//modification d'un personnage
const modifierPerso = async (req, res) => {
  const modifierPerso = await modelPerso.modifierPerso(req.body);
  const perso = req.body;
  const { value, error } = persoSchema.validate(perso);
  if (error == undefined) {
    console.log(modifierPerso);
    res.send("Modification du personnage " + perso.nom);
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

//suppression d'un personnage
const supprimerPerso = async (req, res) => {
  try {
    await modelPerso.supprimerPerso(req.params.idPerso);
    res.send("Suppression du personnage avec l'id_perso " + req.params.idPerso);
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
};

module.exports = {
  perso,
  afficherPerso,
  ajouterPerso,
  modifierPerso,
  supprimerPerso,
  verifJTW,
};
