const express = require("express");

//gestion authentification
const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const { hashPassword, verifyPassword, verifyToken } = require("./auth"); // don't forget to import

const userHandlers = require("./userHandlers");
const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const isItDwight = (req, res) => {

  if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {

    res.send("Credentials are valid");

  } else {

    res.sendStatus(401);

  }

};





app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

// the public routes
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUser);
app.get("/api/users/:id", movieHandlers.getUserById);
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// then the routes to protect


app.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

app.post("/api/users", hashPassword, movieHandlers.postUser);
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", movieHandlers.postMovie);

app.put("/api/users/:id", movieHandlers.updateUser);
app.put("/api/movies/:id", movieHandlers.updateMovie);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", movieHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});


//gestion authentification



