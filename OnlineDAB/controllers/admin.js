//Lists all the registered doctors
//Inputs: - 
//Response: DOC_ID, NAME, REGNO, SPECIALIZATION, LOCATION
const handleGetRegisterDocs = (req, res, db) => {
    // console.log("requested")
    return db.column('DOC_ID', 'NAME', 'REGNO', 'SPECIALIZATION', 'LOCATION')
        .select()
        .from('registerdoctor')
        .orderBy('NAME')
        .then(docs => {
            if (docs.length)
                res.json(docs)
            else
                res.json("NO")
        })
        .catch(err => res.json('error getting docs'))
}



const handleGetAllDocs = (req, res, db) => {
    return db.select('DOC_ID', 'NAME', 'REGNO', 'SPECIALIZATION', 'LOCATION')
        .from('registerdoctor')
        .union(function () {
            this.select('DOC_ID', 'NAME', 'REGNO', 'SPECIALIZATION', 'LOCATION')
                .from('validdoctor')
        })
        .orderBy('NAME')
        .then(all => {
            // console.log("all ", all);
            if (all.length)
                res.json(all)
            else
                res.json("NO")
        })

}

const handleGetValidDocs = (req, res, db) => {
    return db.select('DOC_ID', 'NAME', 'REGNO', 'SPECIALIZATION', 'LOCATION')
        .from('validdoctor')
        .then(valid => {
            // console.log("valid ", valid)
            if (valid.length) {
                res.json(valid);
            } else res.json("NO");
        })
}




//Searching the required doctor
//Input: url query string( location, requirement )
//List of all the matching doctors 
const handleSearchDoc = (req, res, db) => {
    location = req.query.location;
    specialization = req.query.specialization;
    if (!location) location = "_";
    if (!specialization) specialization = "_";
    // console.log(location, specialization);
    db
        .select('*')
        .from('registerdoctor')
        .where('LOCATION', 'like', `%${location}%`).andWhere('SPECIALIZATION', 'like', `%${specialization}%`)
        .then(docs => { res.json(docs) })

}

const handleSearchInAllDocs = (req, res, db) => {
    location = req.query.location;
    specialization = req.query.specialization;
    if (!location) location = "_";
    if (!specialization) specialization = "_";
    // console.log(location, specialization);
    db
        .select('*')
        .from('alldoctors')
        .where('LOCATION', 'like', `%${location}%`).andWhere('SPECIALIZATION', 'like', `%${specialization}%`)
        .then(docs => { res.json(docs) })
}
//Moves the valid doctors to separate table -> validdoctor
//Input: url parameter (id) 
//Response: if successfully moved then responds with "Moved"
const handleValidDoc = (req, res, db) => {
    // console.log(req.params.id)
    db.select('*').from('registerdoctor').where('DOC_ID', '=', req.params.id)
        .then(user => {
            // console.log(user)
            const { DOC_ID, NAME, EMAIL, PHONE_NUMBER, REGNO, SPECIALIZATION, LOCATION } = user[0];

            return db
                .insert({
                    DOC_ID: DOC_ID,
                    NAME: NAME,
                    EMAIL: EMAIL,
                    PHONE_NUMBER: PHONE_NUMBER,
                    REGNO: REGNO,
                    SPECIALIZATION: SPECIALIZATION,
                    LOCATION: LOCATION,
                })
                .into('validdoctor')
                .catch(err => console.log("error entering data into validDoc"))
                .then(id => {
                    // console.log(id);
                    return db('registerdoctor')
                        .where({ DOC_ID })
                        .del()
                        .catch(err => res.json(err.sqlMessaage));
                })
                .catch(err => res.json("Error deleting"))

        })
        .then(flag => res.json('Moved'))
        .catch(e => console.log(e));
}


//Deletes invalid doctor from registerdoctor table
//Input: url parameter (id) 
//Response: if successfully deleted then responds with "Removed"
const handleInvalidDoc = (req, res, db) => {
    const invalidDoc = req.params.id;
    db('registerdoctor')
        .where({ DOC_ID: req.params.id })
        .del()
        .then(r => {
            return db('alldoctors')
                .where({ DOC_ID: req.params.id })
                .del()
        })
        .catch(err => console.log(err))
        .then(r => res.json(`Removed`))


}


//Admin can register new user.
//Input: name, password, specialization, regNo, location
//Response: NAME of the registered person OR if name already exists gives Error
const handleRegisterDoc = (req, res, db) => {
    const { name, password, specialization, regNo, location } = req.body;
    var lindex = 0;
    if (name && password && specialization && regNo && location) {

        db
            .insert({
                NAME: name,
                REGNO: regNo,
                SPECIALIZATION: specialization,
                LOCATION: location
            })
            .into('registerdoctor')
            .catch(err => { res.json("Please enter unique user name") })
            .then(flag => db.select('last_inserted_id()').from('registerdoctor'))
            .then(id => {
                lindex = id[0]
            })
            .then((flag) => {

                db.insert({
                    DOC_ID: lindex,
                    NAME: name,
                    PASSWORD: password,
                })
                    .into('doctorcredentials')
                    .catch(err => { res.json(err) })
            })
            .then(() => {
                db.select('NAME').from('registerdoctor').where({ DOC_ID: lindex })
                    .then(user => res.json(user[0].NAME))
            })
            .catch(err => { res.json(err.sqlMessage) })
    }
    else {
        res.json("field not filled")
    }
}

//Export the functions
module.exports = {
    handleGetRegisterDocs: handleGetRegisterDocs,
    handleInvalidDoc: handleInvalidDoc,
    handleRegisterDoc: handleRegisterDoc,
    handleValidDoc: handleValidDoc,
    handleSearchDoc: handleSearchDoc,
    handleGetAllDocs: handleGetAllDocs,
    handleGetValidDocs: handleGetValidDocs,
    handleSearchInAllDocs: handleSearchInAllDocs
}