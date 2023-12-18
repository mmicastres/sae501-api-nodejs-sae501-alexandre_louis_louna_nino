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
    const elementId = req.params.idElement;
    try {
        const element = await modelElement.afficherElement(elementId);
        res.json(element);
    } catch (error) {
        res.status(404).json({ erreur: 'Element non trouvé' });
    }
};

module.exports = {
    elements,
    afficherElement
};
