const User = require('../users/users-model.js');

async function checkUsernameUnique(req, res, next) {
    try {
        const username = req.body.username;
        const user = await User.findByName(username);

        if (!user) {
            next();
        }
        else {
            next({ status: 400, message: "username taken" });
        }
    }
    catch (err) {
        next(err);
    }
}

async function checkUsernameExists(req, res, next) {
    try {
        const username = req.body.username;
        const user = await User.findByName(username);

        if (user) {
            next();
        }
        else {
            next({ status: 400, message: "invalid credentials" });
        }
    }
    catch (err) {
        next(err);
    }
}

function checkUserData(req, res, next) {
    if (!req.body.username || !req.body.username.trim() || !req.body.password) {
        next({ status: 400, message: 'username and password required' });
    }
    else {
        req.body.username = req.body.username.trim();
        next();
    }
}

module.exports =
{
    checkUsernameUnique,
    checkUsernameExists,
    checkUserData
};