const modelDuel = require("../model/modelDuel.js");
let jwt = require("jsonwebtoken");

const Joi = require("joi");
const schema = Joi.object({
  id_duel: Joi.number().min(1).integer().required(),
  list_joueurs: [
    Joi.object({
      id_joueur: Joi.number().integer().min(1).required(),
      id_element: Joi.number().integer().min(1).required(),
    }),
  ],
  gagnant: Joi.number().integer().min(1).required(),
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
  const duel = await modelDuel.ajoutduel(req.body);
  const { value, error } = schema.validate(req.body);
  if (error == undefined) {
    console.log(duel);
    res.send(" Duel " + req.body.id_duel);
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

module.exports = { verifJTW, duel };
