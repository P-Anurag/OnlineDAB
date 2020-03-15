//For loging in Admin
//Input name, password
//Response: name of the person logging in OR responds with "wrong credentials!"
const handleLoginAdmin = (req, res, db) => {
    db.select('*').from('admincredentials').where('NAME', '=', req.body.name)
        .then(user => {
            if (user[0].PASSWORD === req.body.password) {
                return db.select('NAME').from('admincredentials').where({ NAME: req.body.name })
                    .then(user => res.json(user[0].NAME))
            } else {
                res.json("wrong credentials!");
            }
        })
}

//For loging in Admin
//Input name, password
//Response: name of the person logging in OR responds with "wrong credentials!"
const handleLoginDoc = (req, res, db) => {
    db.select('*').from('doctorcredentials').where('NAME', '=', req.body.name)
        .then(user => {
            if (user[0].PASSWORD === req.body.password) {
                return db.select('*').from('doctorcredentials').where({ NAME: req.body.name })
                    .then(user => res.json(user[0].NAME))
            } else {
                res.json("wrong credentials!");
            }
        })
}

//For loging in Admin
//Input name, password
//Response: name of the person logging in OR responds with "wrong credentials!"
const handleLoginPatient = (req, res, db) => {
    db.select('*').from('patientcredentials').where('NAME', '=', req.body.name)
        .then(user => {
            if (user[0].PASSWORD === req.body.password) {
                return db.select('*').from('patientcredentials').where({ NAME: req.body.name })
                    .then(user => res.json(user[0].NAME))
            } else {
                res.json("wrong credentials!");
            }
        })
}

//Exporting the functions
module.exports = {
    handleLoginPatient: handleLoginPatient,
    handleLoginDoc: handleLoginDoc,
    handleLoginAdmin: handleLoginAdmin,
}