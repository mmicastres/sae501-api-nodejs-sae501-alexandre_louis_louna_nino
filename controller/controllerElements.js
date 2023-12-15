const modelElement = require("../model/modelElement.js");



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
    afficherElement
  };
  