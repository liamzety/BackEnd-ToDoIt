
const MongoClient = require('mongodb').MongoClient;

// Database Name
var dbConn = null;

async function connect() {
const DB_URL = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.DATABASE_URL_DEV

    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(process.env.DATABASE_NAME);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}


async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

module.exports = {
    getCollection
}