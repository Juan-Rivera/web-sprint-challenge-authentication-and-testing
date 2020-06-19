const router = require('express').Router();

const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const { isValid } = require("../jokes/jokes-service.js");
const Jokes = require('../jokes/jokes-model');

router.post('/register', (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Jokes.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Jokes.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = createToken(user);
          
          res.status(200).json({ token, message: "Welcome to our API" });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function createToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  }

  const secret = process.env.JWT_SECRET || 'is it secret? is it safe?';

  const option = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, secret, option);
};

module.exports = router;
