//For loging in Admin
//Input name, password
//Response: name of the person logging in OR responds with "wrong credentials!"
const handleLoginAdmin = (req, res, db) => {
    db.select('*').from('admincredentials').where('EMAIL', '=', req.body.usrname)
        .then(user => {
            if (user.length) {
                if (user[0].PASSWORD === req.body.password) {
                    return db.select('EMAIL').from('admincredentials').where({ EMAIL: req.body.usrname })
                        .then(user => res.json(user[0]))
                } else if (user[0].PASSWORD != req.body.password) {
                    res.json("wrong credentials!");
                }
            } else {
                res.json("no such user")
            }
        })
}

//For loging in Doc
//Input usrname(email), password
//Response: name of the person logging in OR responds with "wrong credentials!"
const handleLoginDoc = (req, res, db) => {
    db.select('*').from('doctorcredentials').where('EMAIL', '=', req.body.usrname)
        .then(user => {
            if (user.length) {
                if (user[0].PASSWORD === req.body.password) {
                    return db.select('*').from('alldoctors').where({ EMAIL: req.body.usrname })
                        .then(user => res.json(user[0]))
                } else {
                    res.json("wrong credentials!");
                }
            } else {
                res.json("no such user")
            }
        })
}

//For loging in Patient
//Input name, password
//Response: name of the person logging in OR responds with "wrong credentials!"
const handleLoginPatient = (req, res, db) => {
    db.select('*').from('patientcredentials').where('EMAIL', '=', req.body.usrname)
        .then(user => {
            if (user.length) {
                if (user[0].PASSWORD === req.body.password) {
                    return db.select('*').from('patient').where({ EMAIL: req.body.usrname })
                        .then(user => res.json(user[0]))
                } else {
                    res.json("wrong credentials!");
                }
            } else {
                res.json("no such user")
            }
        })
        .catch(e => res.json("Network error"))
}

//Exporting the functions
module.exports = {
    handleLoginPatient: handleLoginPatient,
    handleLoginDoc: handleLoginDoc,
    handleLoginAdmin: handleLoginAdmin,
}