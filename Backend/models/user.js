const client = require("../config/db");

const usersCollection = client.db('DBashopBD').collection('users');

module.exports = usersCollection;