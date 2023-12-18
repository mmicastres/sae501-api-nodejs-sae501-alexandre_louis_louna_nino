const modelGrades = require("../model/modelGrades.js");

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

module.exports = { liste,detail}