const bcrypt = require('bcryptjs');
const makeToken = require('./auth-token-builder');
const router = require('express').Router();
const User = require('../users/users-model.js');

const { checkUsernameUnique, checkUsernameExists, checkUserData } = require('./auth-middleware');

router.post('/register', checkUserData, checkUsernameUnique, (req, res, next) => {
    let user = req.body;

    const BCRYPT_ROUNDS = 8;
    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);

    user.password = hash;

    User.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(next);
});

router.post('/login', checkUserData, checkUsernameExists, (req, res, next) => {
    let { username, password } = req.body;

    User.findByName(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = makeToken(user);
                res.status(200).json({ message: `welcome, ${user.username}`, token: token });
            } else {
                next({ status: 401, message: 'invalid credentials' });
            }
        })
        .catch(next);
});


module.exports = router;