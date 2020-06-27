//Get list of all valid docs
//Input: - 
//Response: List of docs
const handleGetDocList = (req, res, db) => {
    db
        .select('*')
        .from('validdoctor')
        .then(docs => {
            if (docs.length)
                res.json(docs);
            else
                res.json("NO");
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
        .from('validdoctor')
        .where('LOCATION', 'like', `%${location}%`).andWhere('SPECIALIZATION', 'like', `%${specialization}%`)
        .then(docs => { res.json(docs) })

}


//Lists available time slots
//input: doc_id, date
const handleAvailableTimeSlot = (req, res, db) => {
    const { doc_id, date } = req.query;
    // let doc_id, date;
    // console.log(date);
    const allTimes = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00'];
    let available = [], ntAvailable = [];

    db
        .select('TIME')
        .from('appointments')
        .where({ DATE: date, DOC_ID: doc_id })
        .union(function () {
            this.select('TIME')
                .from('confirmedappointments')
                .where({ DATE: date, DOC_ID: doc_id })
        })
        .then(notAvailable => {
            for (let i = 0; i < notAvailable.length; i++) {
                ntAvailable.push(notAvailable[i].TIME)
            }
            // res.json(ntAvailable)
            available = allTimes.filter(x => !ntAvailable.includes(x));
            if (available.length)
                res.json(available)
            else
                res.json("NA")
        })
}




//Booking a appointment time slot
//Input: doc_id,pat_id,time
//Response: If successfully booked responds with "Booked!"
// OR if slot already booked responds with "sorry slot not available"
const handleBookAppointment = (req, res, db) => {
    const { doc_id, pat_id, pat_name, date, time } = req.body;

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
                    PATIENT_NAME: pat_name,
                    DATE: date,
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
    // console.log(req.params.id)
    return db.select('NAME', 'SPECIALIZATION', 'DATE', 'TIME', 'validdoctor.PHONE_NUMBER')
        .from('validdoctor')
        .innerJoin('confirmedappointments', 'validdoctor.DOC_ID', 'confirmedappointments.DOC_ID')
        .where('confirmedappointments.PATIENT_ID', '=', req.params.id)

        // .union(function () {
        //     this.select('NAME', 'SPECIALIZATION', 'appointments.DATE', 'appointments.TIME', 'validdoctor.PHONE_NUMBER')
        //         .from('validdoctor')
        //         .innerJoin('appointments', 'validdoctor.DOC_ID', 'appointments.DOC_ID')
        //         .where('appointments.PATIENT_ID', '=', req.params.id)
        // })
        .catch(err => console.log(err))

        .then(appointments => {
            // console.log(appointments)
            if (appointments.length) res.json(appointments);
            else res.json("NO");
        })
        .catch(err => res.json(err))
}


//Store feedback in the database
//Input: pat_id,doc_name,remark
//Response: responds with "saved" if everything went right else responds with error
const handleSendFeedback = (req, res, db) => {
    const { pat_id, doc_id, doc_name, remark } = req.body;
    db.
        insert({
            PATIENT_ID: pat_id,
            DOC_ID: doc_id,
            DOC_NAME: doc_name,
            REMARK: remark
        })
        .into('feedback')
        .then(i => res.json('Saved'))
        .catch(err => res.json(err.sqlMessage));
}

//Gets the list of all the feedbacks
//Input: -
//Response: Array of feedbacks
const handleGetFeedBackDocList = (req, res, db) => {
    const pat_id = req.params.pat_id;
    // console.log(pat_id)
    db.select('history.DOC_ID', 'NAME', 'SPECIALIZATION')
        .from('validdoctor')
        .innerJoin('history', 'validdoctor.DOC_ID', 'history.DOC_ID')
        .where({ PATIENT_ID: pat_id, FEEDBACK: 0 })
        .groupBy('history.DOC_ID')
        .then(feedbackList => {
            if (feedbackList.length)
                res.json(feedbackList);
            else
                res.json("NO")
        })
}

const handleGiveFeedback = (req, res, db) => {
    const { doc_id, pat_id, remark } = req.body;
    db
        .insert({
            DOC_ID: doc_id,
            PATIENT_ID: pat_id,
            REMARK: remark
        })
        .into('feedback')
        .catch(err => console.log(err))
        .then(b => {
            return db('history').where({ DOC_ID: doc_id }).update({ FEEDBACK: 1 })
                .then(done => res.json("SUCCESSFUL"))
        })
}
//Export the functions
module.exports = {
    handleGetDocList: handleGetDocList,
    handleSearchDoc: handleSearchDoc,
    handleBookAppointment: handleBookAppointment,
    handleGetAppointments: handleGetAppointments,
    handleSendFeedback: handleSendFeedback,
    handleAvailableTimeSlot: handleAvailableTimeSlot,
    handleGetFeedBackDocList: handleGetFeedBackDocList,
    handleGiveFeedback: handleGiveFeedback
}