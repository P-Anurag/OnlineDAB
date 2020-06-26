# OnlineDAB
This is a react project on Online doctor appointment booking system.<br />
The files consist code for frontend(react.js), backend(express.js) and SQL<br />

This project covers most of the basic requirements that need to included in a online appointment system.<br />
There are basically 3 sections implemented in the project:<br />
1)Admin section<br />
2)Doctor section<br />
3)Patient section<br />

Workflow of the project 
-The doctors and patients register themselves in the application.<br />
-Admin validates the doctors<br />
-All the valid doctors will be shown to the patients.<br />
-Patients can search and filter the doctors based on location and specialization.<br />
-Once book appointment is clicked and date is selected, available time slots be be displayed.<br />
-Patients can confirm booking and view all the appoints in the appointments section.<br />
-All the appointment will be displayed to the doctors.<br />
-Now the doctors can confirm or reject the appointments, now all the confirmed appointments are visible in the confirmed appointments section.<br />
-After the patient is treated the docter can mark the patient as treated, the patient is moved to history section.<br />
-Once the patient is treated he can give the feedback in the feedback section.<br />
-Doctor can view the feedbacks given by the patients i the feedback section.<br />

Software requirements:<br />
-Node<br />
-React<br />
-Express<br />
-Xampp/Wampp servers<br />

Running the project:<br />
This project can be run as any other react project<br />
-Download the project files.<br />
-Open the frontend and backend in two different command prompts.<br />
-Install all the dependencies using the command "npm i".<br />
-Import the SQL file into XAMPP/WAMPP server and start the server.<br />
-Start the react development server using command "npm start".<br />
-Start the backend listner using command nodemon "server.js".<br />
-You are all set.<br />
