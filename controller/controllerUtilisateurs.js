const modelUtils = require("../model/modelUtilisateur.js");

const liste = async (req, res) => {
    const listeUtils = await modelUtils.listeUtilisateur()
    console.log(listeUtils)
    res.json(listeUtils)

}


const detailUtil = async (req, res) => {
    const detailUtils = await modelUtils.descriptionUtilisateur(req.params.idutil)
    if (detailUtils == 0) {
        res.status(404).json({ "Erreur": "L'utilisateur' n'existe pas" });
    }
    res.json(detailUtils)
}


const detailPerso = async (req, res) => {
    const detailUtils = await modelUtils.listeUtilPerso(req.params.idutil)
    if (detailUtils == 0) {
        res.status(404).json({ "Erreur": "L'utilisateur' n'existe pas" });
    }
    res.json(detailUtils)
}


module.exports = { liste,detailUtil,detailPerso}