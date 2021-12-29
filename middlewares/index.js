const jwt = require("jsonwebtoken");
module.exports = {
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token)
        return res.status(401).send({
          msg: "Provide token please",
        });
      const decoded = jwt.verify(token, process.env.SECREAT);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },

  validateRegister: (req, res, next) => {
    // Fields must not be empty
    if (
      !req.body.email ||
      (req.body.email === "" && !req.body.password) ||
      (req.body.password === "" && !req.body.fullname) ||
      (req.body.fullname === "" && !req.body.phone) ||
      req.body.phone === ""
    ) {
      return res.status(400).send({
        status: 3,
        msg: "Fields must not be empty",
      });
    }

    // check if email isvalid
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        req.body.email
      )
    ) {
      return res.status(400).send({
        status: 4,
        msg: "You have entered an invalid email address!",
      });
    }

    // password min 4 chars
    if (!req.body.password || req.body.password.length < 4) {
      return res.status(400).send({
        status: 4,
        msg: "Please enter a password with min. 6 chars",
      });
    }
    next();
  },
};
