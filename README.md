# react_django_crud1

This is an early version of a garage sell app to create a full CRUD web application using a React frontend and Django backend using the django rest framework. There  are two different React clients in this repository that is editting the garage_sell models two different ways:

1) <strong>garage_sell_client</strong>: This React client edits the garage_sell model using the existing form used to add a new model. This was the easy way for students to solve the problem.

2) <strong>garage_sell_client_inline</strong>: This React client edits the model inline in the page that is easier for a user. This was a challenge for the students to complete. Unfortunately it proved to be too challenging and we went over the answer.

### To run the Django server
- Use the terminal/console to navigate to the garage_sell_server directory and run ```python manage.py runserver```.

<strong>Note</strong> If the server is not run on the 8000 port, you'll have to change all the proxy's in each React client's package.json file.

### To run either React client
- Use the terminal/console to navigate to the garage_sell_client or garage_sell_inline directories. If you have npm installed, run ```npm install``` in the directories. Once complete, run the ```npm start``` command to start the client server.