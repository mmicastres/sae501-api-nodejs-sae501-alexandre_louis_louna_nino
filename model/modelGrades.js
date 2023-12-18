// utilisation du module et tentative de connexion
const nano = require('nano')('http://louna:Mcblbou81120*@127.0.0.1:5984');

// choix d’une base de données
let dbGrades = nano.db.use('grades');

const listeGrade = async () => {
    const query = {
        "selector": {},
        "fields": []
    }
    let grades = await dbGrades.find(query)
    console.log(grades)
    return grades.docs
}


const detailgrade = async (idgrade) => {
    query = {
        "selector": { "id_grade": parseInt(idgrade) },
        "fields": ["niveaux", "titre"]
    }
    let grades = await dbGrades.find(query)
    console.log(grades)
    return grades.docs
}

const ajoutgrade=async(body)=>{
    const grade = body
    let newgrade = await dbGrades.insert(grade)
       console.log(newgrade)
       return newgrade
    
}

module.exports = { listeGrade,detailgrade,ajoutgrade}

// "Apprenti randonneur"
//             in 5..9 -> "Randonneur occasionnel"
//             in 10..14 -> "Randonneur"
//             in 15..19 -> "Randonneur expérimenté"
//             in 20..24 -> "Maître randonneur"
//             in 25..29 -> "Grand maître randonneur"
//             in 30..34 -> "Randonneur suprême"
//             else -> "Éminent randonneur de l'ordre des Hikers"