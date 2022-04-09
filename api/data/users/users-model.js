const db = require("../../data/db-config");

module.exports =
{
    findByName,
    add
};

function findByName(name) {
    /*
    SELECT
        user_id,
        username,
        password
    FROM users;
    */
    return db("users")
        .select("user_id", "username", "password")
        .where("username", name)
        .first();
}

async function add(user) {
    /*
    INSERT INTO users
    (
        username,
        password
    )
    VALUES
    (
        'Anastasia',
        'password'
    )
    */

    // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
    // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password']);
    return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}