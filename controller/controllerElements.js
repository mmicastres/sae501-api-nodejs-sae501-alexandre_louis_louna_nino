const modelElement = require("../model/modelElements.js");


const elements = async (req, res) => {
    try {
        const Elements = await modelElement.elements();
        res.json(Elements);
    } catch (error) {
        res.status(500).json({ erreur: error.message });
    }
};

const afficherElement = async (req, res) => {
    const descriptionElement = await modelElement.afficherElement(req.params.idElement)
    if (descriptionElement == 0) {
        res.status(404).json({ "Erreur": "L'Element n'existe pas" });
    }
    res.json(descriptionElement)
}

module.exports = {
    elements,
    afficherElement
};
