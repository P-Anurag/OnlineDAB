//For registering new admin.
//Input: name, password
//Response: NAME of the registered person OR if name already exists gives Error
const handleRegisterAdmin = (req, res, db) => {
    const { name, password } = req.body;
    if (name && password) {
        db
            .insert({
                NAME: name,
                PASSWORD: password,
            })
            .into('admincredentials')
            .then(id => {
                return db
                    .select('NAME')
                    .from('admincredentials')
                    .where({ AD_ID: id[0] })
                    .then(ad_name => res.json(ad_name[0].NAME))
            })
            .catch(err => { res.json(err.sqlMessage) })
    } else {
        res.json("field not filled")
    }
}

//For registering new doctor.
//Input: name,email,number, password, specialization, regNo, location
//Response: NAME of the registered person OR if name already exists gives Error

const handleRegisterDoc = (req, res, db) => {
    const { name, email, number, password, specialization, regNo, location } = req.body;
    var lindex = 0;
    if (name && email && number && password && specialization && regNo && location) {
        db
            .transaction(trx => {
                trx
                    .insert({
                        NAME: name,
                        EMAIL: email,
                        PHONE_NUMBER: number,
                        REGNO: regNo,
                        SPECIALIZATION: specialization,
                        LOCATION: location
                    })
                    .into('registerdoctor')

                    .catch(err => { console.log("Please enter unique user name") })
                    // .then(db.select('last_inserted_id()').from('registerdoctor'))
                    // .then(id => {
                    //     lindex = id[0];
                    //     console.log("Reg Doc")

                    //     console.log("reg" + lindex);
                    // })
                    .then((id) => {
                        // console.log(id, id[0]);
                        // console.log("Doc Cre")
                        lindex = id[0];
                        return trx
                            .insert({
                                DOC_ID: id[0],
                                EMAIL: email,
                                PASSWORD: password,
                            })
                            .into('doctorcredentials')

                        // .catch(err => { res.json(err) })
                    })
                    .catch(err => { console.log(err.sqlMessage) })
                    .then(id => {
                        // console.log("all " + id);
                        return trx
                            .insert({
                                DOC_ID: lindex,
                                NAME: name,
                                EMAIL: email,
                                PHONE_NUMBER: number,
                                REGNO: regNo,
                                SPECIALIZATION: specialization,
                                LOCATION: location
                            })
                            .into('alldoctors')
                        // .catch(e => { res.json(e) })
                        // console.log("All Doc")
                    })
                    .catch(err => console.log(err.sqlMessage))
                    .then(trx.commit)
                    .catch(trx.rollback)
                    .finally(() => {
                        return db.select('NAME').from('registerdoctor').where({ DOC_ID: lindex })
                            .then(user => {
                                if (user.length) {
                                    res.json(user[0])
                                } else {
                                    res.json("Error!")
                                }
                            })
                    })
                // .then(res.json("done"))
            })
    }
    else {
        res.json("field not filled")
    }

}





const handleRegisterDoc_v1 = (req, res, db) => {
    // console.log(req.body)
    const { name, email, number, password, specialization, regNo, location } = req.body;
    var lindex = 0;
    if (name && email && number && password && specialization && regNo && location) {

        db
            .insert({
                NAME: name,
                EMAIL: email,
                PHONE_NUMBER: number,
                REGNO: regNo,
                SPECIALIZATION: specialization,
                LOCATION: location
            })
            .into('registerdoctor')
            .catch(err => { res.json("Please enter unique user name") })
            .then(db.select('last_inserted_id()').from('registerdoctor'))
            .then(id => {
                lindex = id[0];
                // console.log("reg" + lindex);
            })
            .then((e) => {

                db.insert({
                    DOC_ID: lindex,
                    EMAIL: email,
                    PASSWORD: password,
                })
                    .into('doctorcredentials')
                    .catch(err => { res.json(err) })
            })
            .catch(err => { res.json(err.sqlMessage) })
            .then(e => {
                // console.log("all" + lindex);

                db
                    .insert({
                        DOC_ID: lindex,
                        NAME: name,
                        EMAIL: email,
                        PHONE_NUMBER: number,
                        REGNO: regNo,
                        SPECIALIZATION: specialization,
                        LOCATION: location
                    })
                    .into('alldoctors')
                    .then(() => {
                        db.select('NAME').from('registerdoctor').where({ DOC_ID: lindex })
                            .then(user => res.json(user[0]))
                    })
                    .catch(e => { res.json(e) })
            })
            .catch(err => res.json(err.sqlMessage))


    }
    else {
        res.json("field not filled")
    }
}

//For registering new patient.
//Input: name, password, gender, dob, email, phone, marital_status, address
//Response: NAME of the registered person OR if name already exists gives Error
const handleRegisterPatient = (req, res, db) => {
    const { name, password, gender, dob, email, phone, marital_status, address } = req.body;
    var lindex = 0;
    if (name && password && gender && dob && email && phone && marital_status && address) {

        db
            .insert({
                NAME: name,
                GENDER: gender,
                DOB: dob,
                EMAIL: email,
                PHONE_NUMBER: phone,
                MARITAL_STATUS: marital_status,
                ADDRESS: address
            })
            .into('patient')
            .then(db.select('last_inserted_id()').from('patient'))
            .then(id => {
                lindex = id[0]
            })
            .then(() => {

                db.insert({
                    PATIENT_ID: lindex,
                    EMAIL: email,
                    PASSWORD: password,
                })
                    .into('patientcredentials')
                    .catch()
            })
            .then(() => {
                db.select('NAME').from('patient').where({ PATIENT_ID: lindex })
                    .then(user => res.json(user[0]))
            })
            .catch(err => { res.json(err.sqlMessage) })
    }
    else {
        res.json("field not filled")
    }
}

//Exporting the functions
module.exports = {
    handleRegisterAdmin: handleRegisterAdmin,
    handleRegisterDoc: handleRegisterDoc,
    handleRegisterPatient: handleRegisterPatient,
}