//For getting all the appointments of the Doctor.
//Input: doctor_ID 
//Response: Array of all appointments {Patient_name,Time}  
const handleGetAppointments = (req, res, db) => {
    console.log(req.params.id)
    db.select('NAME', 'TIME')
        .from('patient')
        .innerJoin('appointments', 'patient.PATIENT_ID', 'appointments.PATIENT_ID')
        .where('appointments.DOC_ID', '=', req.params.id)
        .then(appointments => {
            if (appointments.length) res.json(appointments);
            else res.json("No appointments");
        })
        .catch(err => res.json(err))
}


//For deleting a appointment if a doctor is not available.
//Input: doctor_ID, patient_ID, Time.
//Response: If successfully deleted then responds with "Deleted" else Error message
const handleNotAvailable = (req, res, db) => {
    const { doc_id, pat_id, time_slot } = req.body;
    db('appointments')
        .where({ DOC_ID: doc_id, PATIENT_ID: pat_id, TIME: time_slot })
        .del()
        .then(r => res.json('Deleted'))
        .catch(err => res.json(err.sqlMessage))
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
            .then(updatedDoc => { console.log(updatedDoc); if (updatedDoc.length) res.json(updatedDoc[0].NAME) })
            .catch(err => { }))

    //if doctor in registerdoctor
    db('registerdoctor')
        .where({ DOC_ID: req.params.id })
        .update({
            SPECIALIZATION: specialization,
            LOCATION: location
        })
        .then(rres => db.select('NAME').from('registerdoctor').where({ DOC_ID: req.params.id })
            .then(updatedRDoc => { console.log(updatedRDoc); if (updatedRDoc.length) res.json(updatedRDoc[0].NAME) })
            .catch(err => { }))
        .catch(err => res.json(err.sqlMessage))

}


//Exporting the functions
module.exports = {
    handleGetAppointments: handleGetAppointments,
    handleNotAvailable: handleNotAvailable,
    handleEditInfo: handleEditInfo,
}