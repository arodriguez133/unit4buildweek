const db = require('../../data/db-config');

module.exports = {
    get,
    getById
};

async function get() {
    // select * from plants
    return db('plants');
}

async function getById(id) {
    // return db('plants').where({ id: id }).first();
    // WITHOUT .first() WE ALWAYS GET AN ARRAY WHICH COULD BE EMPTY []
    return db('plants')
        .where({ id: id })
        .first();
}