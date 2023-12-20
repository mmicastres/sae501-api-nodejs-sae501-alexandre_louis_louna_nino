const modelUtils = require("../model/modelUtilisateur.js");

const liste = async (req, res) => {
    const listeUtils = await modelUtils.listeUtilisateur()
    console.log(listeUtils)
    res.json(listeUtils)

}


module.exports = { liste}