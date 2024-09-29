This website shows a list of movies from the Hydra Movie Dataset. The list is pulled from MongoDB and the movie posters were pulled from Amazon, since the original movie posters were from the hydramovies.com site which is down.
It allows user aunthentication, and users can add and remove movies from favorites.
It will allow an administator (username: admin) to add or remove movies from the database through an interface.
Written in React.js and Express.js.

React.js version: 18.3.1

Node.js version: v20.16.0

Built with Vite 5.2.0

After cloning the repository, run the command npm install inside both the backend and frontend folders.

To build the application, run the command npm run build:ui inside the backend folder

To run the application, run the command npm start inside the backend folder

You are going to need a .env file inside the backend folder with the following format:

```
MONGODB_URI=<your url here>
PORT=<your desired port>
SECRET=secret
```