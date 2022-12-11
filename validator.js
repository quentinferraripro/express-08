const validateMovie = (req, res, next) => {
    const { title, director, year, duration } = req.body
    const errors = []
    if (title == null) {
        error.push({field : "title", message : "this field is required"});
      } if (director == null) {
        error.push({field : "director", message : "this field is requiered"})
      } if (year == null) {
        error.push({field : "year", message : "this field is riequired"})
      } if (color == null) {
        error.push({field : "color", message : "this field is required"})
      } if (duration == null) {
        error.push({field : "duration", message : "this field is required"})
      }
      if (title == null) {
        errors.push({ field: "title", message: "This field is required" });
      } else if (title.length >= 255) {
        errors.push({ field: "title", message: "Should contain less than 255 characters" });
      }
      if (error.length) {
        res.status(422).json({validationErrors : errors})
    }
  else {
    next();}
  }

    const validateUser = (req, res, next) => {
        const { firstname, lastname, email, city, language } = req.body
        const errors = []
        if (firstname == null) {
            error.push({field : "firstname", message : "this field is required"});
          } if (lastname == null) {
            error.push({field : "lastname", message : "this field is requiered"})
          } if (email == null) {
            error.push({field : "email", message : "this field is riequired"})
            if (!emailRegex.test(email)) {
              errors.push({ field: 'email', message: 'Invalid email' });
            }
          } if (city == null) {
            error.push({field : "city", message : "this field is required"})
          } if (language == null) {
            error.push({field : "language", message : "this field is required"})
            
          }
          if (error.length) {
            res.status(422).json({validationErrors : errors})
        }
       else {
        next();
      }
    };
  
  
  module.exports = {
    validateMovie,
    validateUser
  }