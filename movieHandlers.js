const database = require("./dataBase");
const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];




//tous les films
const getMovies = (req, res) => {
  database
  
      .query("select * from movies")
  
      .then(([movies]) => {
  
        res.json(movies);
  
      })
  
      .catch((err) => {
  
        console.error(err);
  
        res.status(500).send("Error retrieving data from database");
  
      });
  
  };

  //film indiv

  const getMovieById = (req, res) => {

    const id = parseInt(req.params.id);
  
  
    database
  
      .query("select * from movies where id = ?", [id])
  
      .then(([movies]) => {
  
        if (movies[0] != null) {
  
          res.json(movies[0]);
  
        } else {
  
          res.status(404).send("Not Found");
  
        }
  
      })
  
      .catch((err) => {
  
        console.error(err);
  
        res.status(500).send("Error retrieving data from database");
  
      });
  
  };

//tous les users

  const getUser = (req, res) => {
    database
    
        .query("select * from users")
    
        .then(([users]) => {
    
          res.json(users);
    
        })
    
        .catch((err) => {
    
          console.error(err);
    
          res.status(500).send("Error retrieving data from database");
    
        });
    
    };

    //user indiv

  const getUserById = (req, res) => {

    const id = parseInt(req.params.id);
  
  
    database
  
      .query("select * from users where id = ?", [id])
  
      .then(([users]) => {
  
        if (users[0] != null) {
  
          res.json(users[0]);
  
        } else {
  
          res.status(404).send("Not Found");
  
        }
  
      })
  
      .catch((err) => {
  
        console.error(err);
  
        res.status(500).send("Error retrieving data from database");
  
      });
  
  };

  //////////// POST movie

  const postMovie = (req, res) => {

    const { title, director, year, color, duration } = req.body;
  
  
    database
  
      .query(
  
        "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
  
        [title, director, year, color, duration]
  
      )
  
      .then(([result]) => {
  
        res.location(`/api/movies/${result.insertId}`).sendStatus(201);
  
      })
  
      .catch((err) => {
  
        console.error(err);
  
        res.status(500).send("Error saving the movie");
  
      });
  
  };

  //////////// POST user

  const postUser = (req, res) => {

    const { id, firstname, lastname, email, city, language } = req.body;
  
  
    database
  
      .query(
  
        "INSERT INTO users(id, firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?, ?)",
  
        [id, firstname, lastname, email, city, language]
  
      )
  
      .then(([result]) => {
  
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
  
      })
  
      .catch((err) => {
  
        console.error(err);
  
        res.status(500).send("Error saving the user");
  
      });
  
  };
  

///////PUT movie

const updateMovie = (req, res) => {

  const id = parseInt(req.params.id);

  const { title, director, year, color, duration } = req.body;


  database

    .query(

      "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",

      [title, director, year, color, duration, id]

    )

    .then(([result]) => {

      if (result.affectedRows === 0) {

        res.status(404).send("Not Found");

      } else {

        res.sendStatus(204);

      }

    })

    .catch((err) => {

      console.error(err);

      res.status(500).send("Error editing the movie");

    });

};




  //////////// PUT user
  
  const updateUser = (req, res) => {

    const id = parseInt(req.params.id);
  
    const { firstname, lastname, email, city, language } = req.body;
  
  
    database
  
      .query(
  
        "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
  
        [firstname, lastname, email, city, language, id]
  
      )
  
      .then(([result]) => {
  
        if (result.affectedRows === 0) {
  
          res.status(404).send("Not Found");
  
        } else {
  
          res.sendStatus(204);
  
        }
  
      })
  
      .catch((err) => {
  
        console.error(err);
  
        res.status(500).send("Error editing the user");
  
      });
  
  };
  
   

  module.exports = {
  getMovies,
  getMovieById,
  getUser,
  getUserById,
  postMovie,
  postUser,
  updateUser,
  updateMovie,
};
