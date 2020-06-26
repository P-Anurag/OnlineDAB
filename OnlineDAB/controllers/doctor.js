//For getting all the appointments of the Doctor.
//Input: doctor_ID 
//Response: Array of all appointments {Patient_name,Time}  
const handleGetAppointments = (req, res, db) => {
    // console.log(req.params.id)
    db.select('DOC_ID', 'patient.PATIENT_ID', 'PATIENT_NAME', 'TIME', 'DATE', 'PHONE_NUMBER')
        // .from('appointments')
        .from('patient')
        .innerJoin('appointments', 'patient.PATIENT_ID', 'appointments.PATIENT_ID')
        .where('appointments.DOC_ID', '=', req.params.id)
        .then(appointments => {
            // console.log(appointments)
            if (appointments.length) res.json(appointments);
            else res.json("NO");
        })
        .catch(err => res.json(err))
}


//For deleting a appointment if a doctor is not available.
//Input: doctor_ID, patient_ID, Time.
//Response: If successfully deleted then responds with "Deleted" else Error message
const handleNotAvailable = (req, res, db) => {
    const { doc_id, pat_id, date, time_slot } = req.query;
    // console.log(req.query);
    db('appointments')
        .where({ DOC_ID: doc_id, PATIENT_ID: pat_id, DATE: date, TIME: time_slot })
        .del()
        .then(r => res.json('Deleted'))
        .catch(err => res.json(err.sqlMessage))
}


const handleConfirmBooking = (req, res, db) => {
    const { doc_id, pat_id, date, time_slot } = req.body;
    db.select('DOC_ID', 'patient.PATIENT_ID', 'PATIENT_NAME', 'TIME', 'DATE', 'PHONE_NUMBER')
        // .from('appointments')
        .from('patient')
        .innerJoin('appointments', 'patient.PATIENT_ID', 'appointments.PATIENT_ID')
        .where({ DOC_ID: doc_id, DATE: date, TIME: time_slot })
        .andWhere('patient.PATIENT_ID', '=', pat_id)
        .then(app => {
            // console.log(app);
            return db.insert({
                DOC_ID: app[0].DOC_ID,
                PATIENT_ID: app[0].PATIENT_ID,
                PATIENT_NAME: app[0].PATIENT_NAME,
                PHONE_NUMBER: app[0].PHONE_NUMBER,
                DATE: app[0].DATE,
                TIME: app[0].TIME
            }).into('confirmedappointments')
        })
        .catch(err => console.log(err))
        .then(r => {
            db('appointments')
                .where({ DOC_ID: doc_id, PATIENT_ID: pat_id, DATE: date, TIME: time_slot })
                .del()
                .catch(err => console.log(err))
        })
        .then(response => res.json("Confirmed"))
}



const getConfirmedAppointments = (req, res, db) => {
    let doc_id = req.params.doc_id;
    // console.log(doc_id)
    return db.select('DOC_ID', 'PATIENT_ID', 'PATIENT_NAME', 'PHONE_NUMBER', 'TIME', 'DATE', 'PHONE_NUMBER')
        .from('confirmedappointments')
        .where({ DOC_ID: doc_id })
        .then(app => {
            if (app.length) {
                res.json(app)
            } else {
                res.json("NO")
            }
        })
}


const handleTreated = (req, res, db) => {
    // console.log(req.body)
    const { doc_id, pat_id, date, time_slot } = req.body;
    db.select('DOC_ID', 'PATIENT_ID', 'PATIENT_NAME', 'TIME', 'DATE', 'PHONE_NUMBER')
        .from('confirmedappointments')
        .where({ DOC_ID: doc_id, PATIENT_ID: pat_id, DATE: date, TIME: time_slot })
        .then(app => {
            // console.log(app);
            return db.insert({
                DOC_ID: app[0].DOC_ID,
                PATIENT_ID: app[0].PATIENT_ID,
                PATIENT_NAME: app[0].PATIENT_NAME,
                PHONE_NUMBER: app[0].PHONE_NUMBER,
                DATE: app[0].DATE,
                TIME: app[0].TIME
            }).into('history')
        })
        .catch(err => console.log(err))
        .then(r => {
            db('confirmedappointments')
                .where({ DOC_ID: doc_id, PATIENT_ID: pat_id, DATE: date, TIME: time_slot })
                .del()
                .catch(err => console.log(err))
        })
        .then(response => res.json("Moved to history"))
}


const handleMissed = (req, res, db) => {
    const { doc_id, pat_id, date, time_slot } = req.query;
    db('confirmedappointments')
        .where({ DOC_ID: doc_id, PATIENT_ID: pat_id, DATE: date, TIME: time_slot })
        .del()
        .catch(err => console.log(err))
        .then(d => res.json("Deleted"))
}

const handleGetHistory = (req, res, db) => {
    const doc_id = req.params.d_id;
    // console.log(req.params)
    db.select('*')
        .from('history')
        .where({ DOC_ID: doc_id })
        .catch(err => console.log(err))
        .then(history => {
            if (history.length)
                res.json(history)
            else
                res.json("NO")
        })
}
//For editing doctor info.
//Input: new Specialization and new Location
//Response: NAME of the doctor OR Error message 
const handleEditInfo = (req, res, db) => {
    const { specialization, location } = req.body;
    //If doctor in validdoctor
    db('validdoctor')
        .where({ DOC_ID: req.params.id })
        .update({
            SPECIALIZATION: specialization,
            LOCATION: location
        })
        .then(vres => db.select('NAME').from('validdoctor').where({ DOC_ID: req.params.id })
            .then(updatedDoc => { if (updatedDoc.length) res.json(updatedDoc[0].NAME) })
            .catch(err => { }))

    //if doctor in registerdoctor
    db('registerdoctor')
        .where({ DOC_ID: req.params.id })
        .update({
            SPECIALIZATION: specialization,
            LOCATION: location
        })
        .then(rres => db.select('NAME').from('registerdoctor').where({ DOC_ID: req.params.id })
            .then(updatedRDoc => { if (updatedRDoc.length) res.json(updatedRDoc[0].NAME) })
            .catch(err => { }))
        .catch(err => res.json(err.sqlMessage))

}


//Get response corresponding to the current doc
//Input: doc_name
//Response: Array of all the feedbacks
const handleGetFeedbacks = (req, res, db) => {
    const { doc_id } = req.params;
    db.select('REMARK').from('feedback').where({ DOC_ID: doc_id })
        .then(feeds => {
            if (feeds.length) {
                res.json(feeds)
            } else {
                res.json("NO")
            }
        })
        .catch(err => res.json(err.sqlMessage));
}

//Exporting the functions
module.exports = {
    handleGetAppointments: handleGetAppointments,
    handleNotAvailable: handleNotAvailable,
    handleEditInfo: handleEditInfo,
    handleGetFeedbacks: handleGetFeedbacks,
    handleConfirmBooking: handleConfirmBooking,
    getConfirmedAppointments: getConfirmedAppointments,
    handleTreated: handleTreated,
    handleMissed: handleMissed,
    handleGetHistory: handleGetHistory
}