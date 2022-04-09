require("dotenv").config();

module.exports = {
    JWT_SECRET: process.env.SECRET || 'shh',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3300
};