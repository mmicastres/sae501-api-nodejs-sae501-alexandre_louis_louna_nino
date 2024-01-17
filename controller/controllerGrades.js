const modelGrades = require("../model/modelGrades.js");

const Joi = require('joi')
const schema = Joi.object({

    _id: Joi.string(),
    _rev: Joi.string(),
    titre: Joi.string()
        .min(3)
        .max(30)
        .required(),
    id_grade: Joi.number()
        .integer()
        .min(1)
        .required(),
    niveaux: Joi.number()
        .integer()
        .min(1)
        .required(),
    
})


const liste = async (req, res) => {
    const listeGrades = await modelGrades.listeGrade()
    console.log(listeGrades)
    res.json(listeGrades)

}

const detail = async (req, res) => {
    const detailGrade = await modelGrades.detailgrade(req.params.idgrade)
    if (detailGrade == 0) {
        res.status(404).json({ "Erreur": "Le grade n'existe pas" });
    }
    res.json(detailGrade)
}

const ajout = async (req, res) => {
    const ajoutGrade = await modelGrades.ajoutgrade(req.body)
    const grade = req.body
    const { value, error } = schema.validate(grade)
    if (error == undefined) {
        console.log(ajoutGrade)
        res.send(" Ajout du grade " + grade.titre);
    } else {
        console.log(error)
        res.status(406).json({ "Erreur": error.details })
    }
}

module.exports = { liste,detail,ajout}