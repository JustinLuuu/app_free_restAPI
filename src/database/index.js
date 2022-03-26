const { MongoClient } = require('mongodb');
const { Config: { mongoUri, mongoDbName } } = require('../config/index');

let connection = null;

module.exports.Database = (collectionDb) => new Promise(async (resolve, reject) => {
    try {
        if (!connection) {
            const client = new MongoClient(mongoUri);
            connection = await client.connect();
        }

        const db = connection.db(mongoDbName);
        resolve(db.collection(collectionDb));
    } catch (error) {
        reject(error);
    }
});