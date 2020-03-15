//Lists all the registered doctors
//Inputs: - 
//Response: DOC_ID, NAME, REGNO, SPECIALIZATION, LOCATION
const handleGetRegisterDocs = (req, res, db) => {
    return db.column('DOC_ID', 'NAME', 'REGNO', 'SPECIALIZATION', 'LOCATION')
        .select()
        .from('registerdoctor')
        .then(docs => res.json(docs))
        .catch(err => res.json('error getting docs'))
}


//Moves the valid doctors to separate table -> validdoctor
//Input: url parameter (id) 
//Response: if successfully moved then responds with "Moved"
const handleValidDoc = (req, res, db) => {
    db.select('*').from('registerdoctor').where('DOC_ID', '=', req.params.id)
        .then(user => {
            const { DOC_ID, NAME, REGNO, SPECIALIZATION, LOCATION } = user[0];
            return db
                .insert({
                    DOC_ID: DOC_ID,
                    NAME: NAME,
                    REGNO: REGNO,
                    SPECIALIZATION: SPECIALIZATION,
                    LOCATION: LOCATION,
                })
                .into('validdoctor')
                .then(id => {
                    return db('registerdoctor')
                        .where({ DOC_ID: id })
                        .del()
                        .catch(err => res.json(err.sqlMessaage));
                })
                .catch(err => res.json("error entering data into validDoc"))

        })
        .then(res.json('Moved'));
}


//Deletes invalid doctor from registerdoctor table
//Input: url parameter (id) 
//Response: if successfully deleted then responds with "Removed"
const handleInvalidDoc = (req, res, db) => {
    const invalidDoc = req.params.id;
    db('registerdoctor')
        .where({ DOC_ID: req.params.id })
        .del()
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
            .then(db.select('last_inserted_id()').from('registerdoctor'))
            .then(id => {
                lindex = id[0]
            })
            .then(() => {

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
}