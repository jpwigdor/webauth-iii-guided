const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      if (err) {
        // invalid token
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        // valid token
        // req.user = { id: decodeToken.subject };
        req.user = { roles: decodeToken.roles, username: decodeToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No Token Provided" });
  }
};
