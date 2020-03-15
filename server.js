//Node modules used
const express = require('express'); // EXPRESS APP
const bodyParser = require('body-parser'); //For reading the body of the request 
const cors = require('cors'); // CORS to permit Cross origin resourse sharing
const mysql = require('mysql'); // For mysql database
const knex = require('knex'); //KNEX.JS = SQL query builder language


//Declaring app 
const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());


// Links to all the required route handlers
const register = require('./controllers/register');
const login = require('./controllers/login');
const admin = require('./controllers/admin');
const patient = require('./controllers/patient');
const doctor = require('./controllers/doctor')


//Connecting MYSQL databse = onlineDAB
var db = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'onlineDAB'
    }
})

//Routes for handleing Register, forwarded to  -> register.js 
app.post('/registerAdmin', (req, res) => register.handleRegisterAdmin(req, res, db));
app.post('/registerDoc', (req, res) => register.handleRegisterDoc(req, res, db));
app.post('/registerPatient', (req, res) => register.handleRegisterPatient(req, res, db));


//Routes for handleing Login, forwarded to  -> login.js 
app.post('/loginAdmin', (req, res) => login.handleLoginAdmin(req, res, db));
app.post('/loginPatient', (req, res) => login.handleLoginPatient(req, res, db));
app.post('/loginDoc', (req, res) => login.handleLoginDoc(req, res, db));


//Routes for handleing Admin related activities, forwarded to  -> admin.js 
app.get('/admin/getRegisterDocs', (req, res) => admin.handleGetRegisterDocs(req, res, db));
app.post('/admin/validDoc/:id', (req, res) => admin.handleValidDoc(req, res, db));
app.delete('/admin/invalidDoc/:id', (req, res) => admin.handleInvalidDoc(req, res, db));
app.post('/admin/registerDoc', (req, res) => admin.handleRegisterDoc(req, res, db));


//Routes for handleing Patient related activities, forwarded to  -> patient.js 
app.get('/patient/searchDoc', (req, res) => patient.handleSearchDoc(req, res, db));
app.post('/patient/bookAppointment', (req, res) => patient.handleBookAppointment(req, res, db));
app.get('/patient/getAppointments/:id', (req, res) => patient.handleGetAppointments(req, res, db))


//Routes for handleing Doctor related activities, forwarded to  -> doctor.js 
app.get('/doctor/getAppointments/:id', (req, res) => doctor.handleGetAppointments(req, res, db));
app.delete('/doctor/appointments/notAvailable', (req, res) => doctor.handleNotAvailable(req, res, db));
app.put('/doctor/editInfo/:id', (req, res) => doctor.handleEditInfo(req, res, db));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

