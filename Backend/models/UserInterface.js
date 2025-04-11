const client = require("../config/db");

const bannersCollection = client.db('DBashopBD').collection('Ui');



module.exports = bannersCollection