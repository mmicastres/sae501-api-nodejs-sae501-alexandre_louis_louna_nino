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
  ),
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
  const duel = await modelDuel.ajoutDuel(req.body);
  const { value, error } = schema.validate(req.body);
  if (error == undefined) {
    console.log(duel);
    res.send(" Duel " + req.body.id_duel);
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

const getDuels = async (req, res) => {
  const duels = await modelDuel.getDuels();
  res.send(duels);
};

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

module.exports = { verifJTW, duel, updateDuel, getDuels, response };
