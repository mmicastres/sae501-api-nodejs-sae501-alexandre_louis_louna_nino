const modelUtils = require("../model/modelUtilisateur.js");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Joi = require("joi");

const schema = Joi.object({
  _id: Joi.string(),
  _rev: Joi.string(),
  pseudo: Joi.string().max(30).required(),
  mdp: Joi.string().max(30).required(),
  email: Joi.string().email().max(30).required(),
  id_util: Joi.number().integer().min(1),
  liste_perso: Joi.array().items(Joi.number()),
  localisation: Joi.object({
    x: Joi.number(),
    y: Joi.number(),
  }),
  nbr_km_total: Joi.number().integer(),
  nbr_km_today: Joi.number().integer(),
  duel_gagne: Joi.number().integer(),
});

const schemaco = Joi.object({
  mdp: Joi.string().max(30).required(),
  email: Joi.string().email().max(30),
  pseudo: Joi.string().max(30),
  id_util: Joi.number().integer().min(1),
});

const schemakilometre_total = Joi.object({
  nbr_km_total: Joi.number().integer(),
  nbr_km_today: Joi.number().integer(),
  localisation: Joi.object({
    x: Joi.number(),
    y: Joi.number(),
  }),
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

// Créer un token
const getToken = async (id_util) => {
  const payload = {
    username: "utilisateur",
    id_util: id_util,
  };

  const secretKey = "clesecrete";

  const token = jwt.sign(payload, secretKey, { expiresIn: "100h" });
  return token;
};
// Le nombre de "salts" à générer

// Fonction pour hacher le mot de passe
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

// Fonction pour vérifier le mot de passe
const checkPassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};

// const isMatch = await checkPassword(
//   "motdepasse123",
//   hashedPasswordFromDatabase,
// );

// if (isMatch) {
//   console.log("Mot de passe correct");
// } else {
//   console.log("Mot de passe incorrect");
// }

//liste de tous les utilisateurs
const liste = async (req, res) => {
  const listeUtils = await modelUtils.listeUtilisateur();
  // console.log("listeUtils");
  res.json(listeUtils);
};

//details d'un utilisateur
const detailUtil = async (req, res) => {
  const detailUtils = await modelUtils.descriptionUtilisateur(
    req.params.idutil,
  );
  if (detailUtils == 0) {
    res.status(404).json({ Erreur: "L'utilisateur' n'existe pas" });
  }
  res.json(detailUtils);
};

//renvoie la liste des personnages que l'utilisateur posséde
const detailPerso = async (req, res) => {
  const detailUtils = await modelUtils.listeUtilPerso(req.params.idutil);
  if (detailUtils == 0) {
    res.status(404).json({ Erreur: "L'utilisateur' n'existe pas" });
  }
  res.json(detailUtils);
};

//ajout d'un utilisateur
const ajout = async (req, res) => {
  const utilisateur = req.body;
  const { value, error } = schema.validate(utilisateur);
  const idMax = await modelUtils.maxId();

  if (error == undefined) {
    // Vérifier si le pseudo existe déjà
    const pseudoExists = await modelUtils.checkPseudoExists(utilisateur.pseudo);
    if (pseudoExists) {
      return res.status(409).json({ Erreur: "Le pseudo est déjà pris" });
    }

    // Vérifier si l'email existe déjà
    const emailExists = await modelUtils.checkEmailExists(utilisateur.email);
    if (emailExists) {
      return res.status(409).json({ Erreur: "L'email est déjà pris" });
    }

    // Si le pseudo et l'email sont uniques, procéder à l'ajout
    const cryptedMdp = await hashPassword(utilisateur.mdp);
    const modifUtilisateur = {
      ...utilisateur,
      id_util: idMax + 1,
      mdp: cryptedMdp,
    };

    const ajoutUtil = await modelUtils.ajoutUtil(modifUtilisateur);
    res.json({ success: true, message: "Ajout de l'utilisateur" });
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

const supprimerUtil = async (req, res) => {
  try {
    await modelUtils.supprimerUtil(req.params.idutil);
    res.json({
      success: true,
      message: "Suppression du personnage avec l'id_util " + req.params.idutil,
    });
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
};

//connexion
const connexion = async (req, res) => {
  const { email, pseudo, mdp } = req.body;

  try {
    // Vérifier si l'utilisateur existe dans la base de données
    const utilisateur = await modelUtils.connexionUtil(email || pseudo);
    const isMatch = await checkPassword(mdp, utilisateur.mdp);
    console.log(isMatch);

    if (!utilisateur || !isMatch) {
      return res
        .status(401)
        .json({ erreur: "Email ou mot de passe incorrect" });
    }

    // Générer un jeton avec id_util
    const token = await getToken(utilisateur.id_util);

    res.json({ token, id_util: utilisateur.id_util });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la connexion" });
  }
};

//modification d'un utilisateur
const modifierUtil = async (req, res) => {
  const utilisateur = req.body;
  const { value, error } = schemaco.validate(utilisateur);
  if (error == undefined) {
    if (utilisateur.mdp != "") {
      const cryptedMdp = await hashPassword(utilisateur.mdp);
      const modifUtil = {
        ...utilisateur,
        mdp: cryptedMdp,
      };
      const modifierUtil = await modelUtils.modifierUtilisateur(modifUtil);
      // console.log(modifierUtil);
    }
    res.json({
      success: true,
      message: "Modification du l'utilisateur " + utilisateur.pseudo,
    });
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

// victoire Duel
const incrementerDuels = async (req, res) => {
  const id_util = req.params.idutil;
  try {
    await modelUtils.incrementerDuelsGagnes(id_util);
    const personnageAleatoire =
      await modelUtils.recevoirPersonnageAleatoire(id_util);
    res.json({
      message: "Victoire dans le duel!",
      personnageAleatoire: personnageAleatoire,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ erreur: "Erreur lors de l'incrémentation des duels gagnés" });
  }
};

//kilometres
const modifkilometres = async (req, res) => {
  const kilometres = req.body;
  const id_util = req.params.idutil;
  const { value, error } = schemakilometre_total.validate(kilometres);
  if (error == undefined) {
    const modifierUtil = await modelUtils.modifkilo(id_util, kilometres);
    console.log(modifierUtil);

    res.json({
      success: true,
      message: `x : ${kilometres.localisation.x}, y : ${kilometres.localisation.y}`,
    });
  } else {
    console.log(error);
    res.status(406).json({ Erreur: error.details });
  }
};

const detecterUtilisateursProximite = async (req, res) => {
  try {
    const id_util = req.params.idutil;
    const utilisateur = await modelUtils.descriptionUtilisateur(id_util);

    const { x: currentX, y: currentY } = utilisateur.localisation;

    const utilisateursProximite =
      await modelUtils.rechercherUtilisateursProximite(
        id_util,
        currentX,
        currentY,
      );

    res.json({ utilisateursProximite });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erreur: "Erreur lors de la détection des utilisateurs à proximité",
    });
  }
};
module.exports = {
  liste,
  detailUtil,
  detailPerso,
  ajout,
  supprimerUtil,
  connexion,
  verifJTW,
  modifierUtil,
  modifkilometres,
  incrementerDuels,
  detecterUtilisateursProximite,
};
