const client = require("../config/db");

const productCollection = client.db('DBashopBD').collection('product');

module.exports = productCollection;