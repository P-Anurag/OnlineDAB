//Searching the required doctor
//Input: url query string( location, requirement )
//List of all the matching doctors 
const handleSearchDoc = (req, res, db) => {

    location = req.query.location;
    requirement = req.query.requirement;
    db
        .select('*')
        .from('validdoctor')
        .where({ LOCATION: location, SPECIALIZATION: requirement })
        .then(docs => { res.json(docs) })

}


//Booking a appointment time slot
//Input: doc_id,pat_id,time
//Response: If successfully booked responds with "Booked!"
// OR if slot already booked responds with "sorry slot not available"
const handleBookAppointment = (req, res, db) => {
    const { doc_id, pat_id, time } = req.body;

    db
        .select('*')
        .from('appointments')
        .where({ DOC_ID: doc_id, TIME: time })
        .catch(err => console.log(err))
        .then(data => {
            if (data.length > 0) {
                res.json("sorry slot not available")
            } else {
                db.insert({
                    DOC_ID: doc_id,
                    PATIENT_ID: pat_id,
                    TIME: time
                })
                    .into('appointments')
                    .then(res.json('Booked!'))
            }
        })
        .catch(err => console.log(err));
}


//Lists all the appointments corresponding to the patient.
//Input: url parameter (id)
//Response: Array of  {doctor name, time}
const handleGetAppointments = (req, res, db) => {
    db.select('NAME', 'TIME')
        .from('validdoctor')
        .innerJoin('appointments', 'validdoctor.DOC_ID', 'appointments.DOC_ID')
        .where('appointments.PATIENT_ID', '=', req.params.id)
        .then(appointments => {
            if (appointments.length) res.json(appointments);
            else res.json("You have no appiontments or ur booking has been canceled since doc was busy");
        })
        .catch(err => res.json(err))
}

//Export the functions
module.exports = {
    handleSearchDoc: handleSearchDoc,
    handleBookAppointment: handleBookAppointment,
    handleGetAppointments: handleGetAppointments,
}