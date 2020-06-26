# OnlineDAB
This is a react project on Online doctor appointment booking system.
The files consist code for frontend(react.js), backend(express.js) and SQL

This project covers most of the basic requirements that need to included in a online appointment system.
There are basically 3 sections implemented in the project:
1)Admin section
2)Doctor section
3)Patient section

Workflow of the project  
-The doctors and patients register themselves in the application.
-Admin validates the doctors
-All the valid doctors will be shown to the patients.
-Patients can search and filter the doctors based on location and specialization.
-Once book appointment is clicked and date is selected, available time slots be be displayed.
-Patients can confirm booking and view all the appoints in the appointments section.
-All the appointment will be displayed to the doctors.
-Now the doctors can confirm or reject the appointments, now all the confirmed appointments are visible in the confirmed appointments section.
-After the patient is treated the docter can mark the patient as treated, the patient is moved to history section.
-Once the patient is treated he can give the feedback in the feedback section.
-Doctor can view the feedbacks given by the patients i the feedback section.

Software requirements:
-Node
-React
-Express
-Xampp/Wampp servers

Running the project:
This project can be run as any other react project
-Download the project files.
-Open the frontend and backend in two different command prompts.
-Install all the dependencies using the command "npm i".
-Import the SQL file into XAMPP/WAMPP server and start the server.
-Start the react development server using command "npm start".
-Start the backend listner using command nodemon "server.js".
-You are all set
