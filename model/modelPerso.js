const nano = require("nano")("http://lln4432a:Lel!ege2003!@localhost:5984");
const dbPerso = nano.db.use('personnages');


const perso = async () => {
  const query = {
    selector: {},
    fields: [],
  };
  console.log(query)
  let perso = await dbPerso.find(query);
  return perso.docs;
};

const afficherPerso = async (persoId) => {
  const query = {
      "selector": { "id_perso": parseInt(persoId) },
      "fields": []
  }
  let perso = await dbPerso.find(query)
  return perso.docs
}

  const ajouterPerso =async(body)=>{
    const perso = body
    let newperso = await dbPerso.insert(perso)
       console.log(newperso)
       return newperso

}

module.exports = {
  perso,
  afficherPerso,
  ajouterPerso
};