# Programming Language Voting System

This project aims to create a web application that allows users to vote for their favorite programming language. The application consists of a front-end and a back-end.

## Front-end

The front-end of the application is built using HTML, CSS, and JavaScript. It provides a user interface where users can view the programming languages and vote for their favorite one. The front-end communicates with the back-end using HTTP requests.

To set up the front-end, follow these steps:

1. Clone the repository: `git clone <repository URL>`
2. Navigate to the front-end directory: `cd front-end`
3. Start a live server extension .
   3.1 Live Server Extension: If you are using a code editor like Visual Studio Code, you can use the "Live Server" extension to quickly launch a development server. Here's how to do it:
   - Install the "Live Server" extension from the Visual Studio Code Marketplace.
   - Open the HTML file `register.html ` of your front-end code in Visual Studio Code.
   - Right-click anywhere in the HTML file and select "Open with Live Server". This will launch a local development server and open the HTML file in your default web browser.

## Back-end

The back-end of the application is built using Node.js and Express.js. It provides the necessary APIs to handle voting and store the votes in a database. The back-end communicates with the front-end by receiving HTTP requests and sending JSON responses.

To set up the back-end, follow these steps:

1. Clone the repository: `git clone <repository URL>`
2. Navigate to the back-end directory: `cd back-end`
3. Install the dependencies: `npm install`
4. linked MongoDB hosted on MongoDB Atlas:  
   -Create a MongoDB Atlas account and log in to your Atlas dashboard.
   -Create a new MongoDB database or select an existing one.
   -In the database settings, go to the "Network Access" tab.
   -Click on the "Add IP Address" button and enter 0.0.0.0/0 in the IP address field. This will allow access from any IP address.
   -Click on the "Confirm" button to save the changes.
5. make .env file in back-end folder and add this line: `mongoUrl="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>"`

   - Replace <username>, <password>, <cluster-url>, and <database-name> with your own credentials.

6. in your database the collection name is: `votes` insert your what do you want to vote like taht : {"Angular":1,"React":2,"VueJs"3}
7. Configure the database connection in the back-end code to connect to your database.
8. Start the server: `npm run start`
9. The back-end will be running at: `http://localhost:3000`

## explanation

This expanded version includes specific instructions for setting up the back-end using Node.js and Express.js. It provides detailed steps for downloading and installing the necessary dependencies, as well as configuring the MongoDB database connection hosted on MongoDB Atlas. By following these instructions, you can ensure that the back-end is properly set up to handle voting and store the votes in the database. Let me know if you need further assistance with this!

## Contact

If you have any questions, please contact the author at [ahmedmoghazy9399@gmail.com].
