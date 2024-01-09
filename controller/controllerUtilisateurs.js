const modelUtils = require("../model/modelUtilisateur.js");

const Joi = require("joi");
const schema = Joi.object({
  _id: Joi.string(),
  _rev: Joi.string(),
  pseudo: Joi.string()

    .max(30)
    .required(),
  mdp: Joi.string().max(30).required(),
  email: Joi.string().email().max(30).required(),
  id_util: Joi.number().integer().min(1).required(),
  liste_perso: Joi.array().items(Joi.number()),
  exp: Joi.number().integer(),
  nbr_km_total: Joi.number().integer(),
  nbr_km_today: Joi.number().integer(),
  duel_gagne: Joi.number().integer(),
});

const liste = async (req, res) => {
  const listeUtils = await modelUtils.listeUtilisateur();
  console.log(listeUtils);
  res.json(listeUtils);
};

const detailUtil = async (req, res) => {
  const detailUtils = await modelUtils.descriptionUtilisateur(
    req.params.idutil,
  );
  if (detailUtils == 0) {
    res.status(404).json({ Erreur: "L'utilisateur' n'existe pas" });
  }
  res.json(detailUtils);
};

const detailPerso = async (req, res) => {
  const detailUtils = await modelUtils.listeUtilPerso(req.params.idutil);
  if (detailUtils == 0) {
    res.status(404).json({ Erreur: "L'utilisateur' n'existe pas" });
  }
  res.json(detailUtils);
};

const ajout = async (req, res) => {
  const utilisateur = req.body;
  const { value, error } = schema.validate(utilisateur);
  if (error == undefined) {
    const ajoutUtil = await modelUtils.ajoutUtil(req.body);
    console.log(ajoutUtil);
    res.send(" Ajout de l'utilisateur : " + utilisateur.pseudo);
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

module.exports = { liste, detailUtil, detailPerso, ajout };
