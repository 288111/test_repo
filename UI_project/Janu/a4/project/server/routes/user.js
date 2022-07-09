const router = require('express').Router();
let User = require('../models/user');
const bcryptjs = require('bcryptjs');

router.route('/').get((req, res) => {
  User.find()
    .select(['-password', '-salt'])
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;
  const salt = bcryptjs.genSaltSync(10);
  password = bcryptjs.hashSync(password, salt);

  const newUser = new User({
    username,
    email,
    password,
    salt,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  newUser
    .save()
    .then(() => res.json('User created'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;

  User.findById(req.params.id)
    .then((user) => {
      if (username) {
        user.username = username;
      }
      if (email) {
        user.email = email;
      }
      if (password) {
        const salt = bcryptjs.genSaltSync(10);
        password = bcryptjs.hashSync(password, salt);
        user.password = password;
        user.salt = salt;
      }
      user.updatedAt = new Date();
      user
        .save()
        .then(() => res.json('User updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// router.route('/:id').get((req, res) => {
//   User.findById(req.params.id)
//     .select(['-password', '-salt'])
//     .then((user) => {
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).json('Resource Not found');
//       }
//     })
//     .catch((err) => res.status(400).json('Error: ' + err));
// });
router.route('/:name').get((req, res) => {
  User.findOne({ username: req.params.name })
    .select(['-password', '-salt'])
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json('Resource Not found');
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
  const username = req.body.username;
  let password = req.body.password;
  const salt = bcryptjs.genSaltSync(10);
  password = bcryptjs.hashSync(password, salt);
  const newUser = new User({
    username,
    password,
    salt,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  newUser
    .save()
    .then(() => {
      res.json({ message: 'OK', error: '' });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ message: '', error: 'userid is already in use' });
      }
      return res.status(400).json({ message: '', error: 'invalid request' });
    });
});

router.route('/login').post((req, res) => {
  const username = req.body.username;
  let password = req.body.password;
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        let salt = user.salt;
        password_hash = bcryptjs.hashSync(password, salt);
        if (password_hash == user.password) {
          return res.json({ message: 'OK', error: '' });
        } else {
          return res.status(401).json({ message: '', error: 'unauthorised' });
        }
      } else {
        res.status(404).json({ message: '', error: 'Resource Not found' });
      }
    })
    .catch((err) => res.status(400).json({ message: '', error: err }));
});

module.exports = router;
