const modelDuel = require("../model/modelDuel.js");
const modelUtilisateur = require("../model/modelUtilisateur.js");
let jwt = require("jsonwebtoken");

const Joi = require("joi");
const schema = Joi.object({
  id_duel: Joi.number().min(1).integer().required(),
  list_joueurs: Joi.array().items(
    Joi.object({
      id_joueur: Joi.number().integer().min(1).required(),
      id_element: Joi.number().integer().min(1).required().allow(null),
    }),
  ).required(),
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
  const duelBody = { ...req.body, id_duel: maxId + 1 }
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
  res.send(duels);
};

<<<<<<< HEAD
const response = async (req, res) => {
  const currentUserId = req.query.currentUserId;
  const currentX = req.query.currentX;
  const currentY = req.query.currentY;

  try {
    const utilisateursProximite =
      await modelUtilisateur.rechercherUtilisateursProximite(
        currentUserId,
        currentX,
        currentY,
      );
    const utilisateur1Duel = utilisateursProximite[0].want_duel;
    const utilisateur2Duel = utilisateursProximite[1].want_duel;
    console.log("utilisateur1Duel", utilisateur1Duel);
    console.log("utilisateur2Duel", utilisateur2Duel);
    if (utilisateur1Duel === utilisateur2Duel) {
      res.status(200).json({ message: "True" });
    } else {
      res.status(200).json({ message: "Undes utilisateur a répondu False" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la comparaison des utilisateurs.",
    });
  }
};
=======
const response = async (req, res) => { };
>>>>>>> 890baf3ddbaaafcfc48b4a391139e4338d1f7d6b

const updateDuel = async (req, res) => {
  // const duel = await modelDuel.getDuel();
  // console.log(req.body);

  const modifierDuel = await modelDuel.updateDuel(req.body);
  res.send(modifierDuel);

  // if (error == undefined) {
  //   console.log(duel);
  //   res.send(" Duel " + req.body.id_duel);
  // } else {
  //   console.log(error);
  //   res.status(406).json({ Erreur: error.details });
  // }
};

<<<<<<< HEAD
module.exports = { verifJTW, duel, updateDuel, getDuels, response };
=======
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

module.exports = { verifJTW, duel, updateDuel, getDuels, deleteDuel };
>>>>>>> 890baf3ddbaaafcfc48b4a391139e4338d1f7d6b
