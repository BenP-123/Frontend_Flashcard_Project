Project: Flashcard-o-matic
This project allows the user to create, read, update and delete flashcards and the decks those cards are associated with. 

Project setup
Follow the instructions below to get this project up and running on your own machine:

Run npm install to install the project.

To run the tests, you can run the following command:

npm test

Most of the tests in this project wait for content to load via the API before continuing the test. Before the implementation is complete, the content never loads so the test fails with a timeout. As a result, the tests will initially run slowly. It may take perhaps a minute or more for all the tests run. The tests will speed up as the implementation nears completion.

You can run the application using the following command.

npm start

The start command will start two servers concurrently:

An API server, powered by json-server, running on http://localhost:5000
A React application running on http://localhost:3000
To stop the servers from running, you can press Control+C.

Running on Windows
If you are having problems running npm start on Windows, you may need to run the React client and server in separate terminals. Open a terminal and run npm run start:react to start the react application. Open another terminal and run npm run start:server to run the server.


