const modelPerso = require("../model/modelPerso.js");


const perso = async (req, res) => {
    try {
        const Perso = await modelPerso.perso();
        res.json(Perso);
    } catch (error) {
        res.status(500).json({ erreur: error.message });
    }
};

const afficherPerso = async (req, res) => {
    const descriptionPerso = await modelPerso.afficherPerso(req.params.idPerso)
    if (descriptionPerso == 0) {
        res.status(404).json({ "Erreur": "Le personnage n'existe pas" });
    }
    res.json(descriptionPerso)
}

module.exports = {
    perso,
    afficherPerso
};
