const modelDuel = require("../model/modelDuel.js");
const modelUti = require("../model/modelUtilisateur.js");
let jwt = require("jsonwebtoken");

const Joi = require("joi");
const schema = Joi.object({
  id_duel: Joi.number().min(1).integer().required(),
  list_joueurs: Joi.array()
    .items(
      Joi.object({
        id_joueur: Joi.number().integer().min(1).required(),
        id_element: Joi.number().integer().min(1).required().allow(null),
      }),
    )
    .required(),
  gagnant: Joi.number().integer().min(1).required().allow(null),
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

const duel = async (req, res) => {
  const maxId = await modelDuel.maxId();
  const duelBody = { ...req.body, id_duel: maxId + 1 };
  // console.log(duelBody);
  const { value, error } = schema.validate(duelBody);
  if (error == undefined) {
    const duel = await modelDuel.ajoutDuel(duelBody);
    console.log(duel);
    res.json({ success: true, message: "Ajout de l'utilisateur " });
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

const getDuels = async (req, res) => {
  const duels = await modelDuel.getDuels();
  res.json(duels);
};

const getDuel = async (req, res) => {
  const duel = await modelDuel.getDuel(req.params.idDuel);
  res.json(duel);
};

const response = async (req, res) => {
  const currentUserId = req.params.idDuel;

  // Faire une recherche avec l'id de l'url
  const user = await modelUti.descriptionUtilisateur(currentUserId);
  // console.log("user", user.localisation);
  const currentX = user.localisation.x;
  // console.log("currentX", currentX);
  const currentY = user.localisation.y;
  // console.log("currentY", currentY);
  try {
    const utilisateursProximite =
      await modelUti.rechercherUtilisateursProximite(
        currentUserId,
        currentX,
        currentY,
      );

    const utilisateur1Duel = utilisateursProximite[0].want_duel;
    const utilisateur2Duel = utilisateursProximite[1].want_duel;

    if (utilisateur1Duel === true && utilisateur2Duel === true) {
      res
        .status(200)
        .json({ duel: true, message: "Les utilisateurs veulent se battre" });
    } else {
      res
        .status(200)
        .json({ duel: false, message: "Un des utilisateurs a réussi à fuir" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: error.message });
  }
};

// Mettre à jour le duel
const updateDuel = async (req, res) => {
  const duelBody = req.body;

  const { value, error } = schema.validate(duelBody);

  if (error == undefined) {
    const duel = await modelDuel.updateDuel(req.body);
    if (duel === false) {
      res.status(404).json({ success: false, message: "Duel inexistant" });
    } else {
      res.json({ success: true, message: "Duel inexistant" });
    }
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

// Suppresion d'un duel
const deleteDuel = async (req, res) => {
  try {
    await modelDuel.deleteDuel(req.params.idDuel);
    res.json({
      success: true,
      message: "Suppression du duel n° " + req.params.idDuel,
    });
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
};

module.exports = {
  verifJTW,
  duel,
  updateDuel,
  getDuels,
  getDuel,
  deleteDuel,
  response,
};
