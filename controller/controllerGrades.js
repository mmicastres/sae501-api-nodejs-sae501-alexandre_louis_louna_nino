const modelGrades = require("../model/modelGrades.js");
let jwt = require("jsonwebtoken");

const Joi = require("joi");
const schema = Joi.object({
  _id: Joi.string(),
  _rev: Joi.string(),
  titre: Joi.string().min(3).max(30).required(),
  id_grade: Joi.number().integer().min(1).required(),
  niveaux: Joi.number().integer().min(1).required(),
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

//liste de tous les grades
const liste = async (req, res) => {
  const listeGrades = await modelGrades.listeGrade();
  console.log(listeGrades);
  res.json(listeGrades);
};

//detail d'un grade
const detail = async (req, res) => {
  const detailGrade = await modelGrades.detailgrade(req.params.idgrade);
  if (detailGrade == 0) {
    res.status(404).json({ Erreur: "Le grade n'existe pas" });
  }
  res.json(detailGrade);
};

//ajout d'un grade
const ajout = async (req, res) => {
  const ajoutGrade = await modelGrades.ajoutgrade(req.body);
  const grade = req.body;
  const { value, error } = schema.validate(grade);
  if (error == undefined) {
    console.log(ajoutGrade);
    res.send(" Ajout du grade " + grade.titre);
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

module.exports = { liste, detail, ajout, verifJTW };
