const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../../config');

const restricted = (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
        next({ status: 401, message: 'token required' });
    }
    else {
        const parts = bearerHeader.split(' ');
        let token = "";

        if (parts.length === 1) {
            token = parts[0];
        }
        else if (parts.length === 2) {
            token = parts[1];
        }
        else {
            next({ status: 401, message: `token invalid` });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                next({ status: 401, message: 'token invalid' });
            } else {
                req.decodedJwt = decoded;
                next();
            }
        });
    }
};

module.exports = {
    restricted
};