const modelElement = require("../model/modelElements.js");
let jwt = require("jsonwebtoken");

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

//liste de tous les elements
const elements = async (req, res) => {
  try {
    const Elements = await modelElement.elements();
    res.send(Elements);
  } catch (error) {
    res.status(404).json({ erreur: "error.message" });
  }
};

//details d'un element
const afficherElement = async (req, res) => {
  const descriptionElement = await modelElement.afficherElement(
    req.params.idElement,
  );
  if (descriptionElement == 0) {
    res.status(404).json({ Erreur: "L'Element n'existe pas" });
  }
  res.json(descriptionElement);
};

module.exports = {
  elements,
  afficherElement,
  verifJTW,
};
