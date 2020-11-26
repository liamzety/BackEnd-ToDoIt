
const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId

async function query(id) {
    try {
        const collection = await dbService.getCollection('users')
        return await collection.findOne({ "_id": ObjectId(id) })
    } catch (err) {
        console.log('Error, cannot find users', err)
        throw err
    }
}
async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        console.log('Error, cannot get user', err)
        throw err
    }
}

async function add(user) {
    user.createdAt = Date.now();
    user.notes = [{
        _id: _makeid(),
        title: "Untitled",
        body: ""
    }]
    try {
        const collection = await dbService.getCollection('users')
        if (await getByUsername(user.username)) throw { msg: 'username taken.' }
        await collection.insertOne(user)
        return user
    } catch (err) {
        throw err
    }
}

module.exports = {
    add,
    query,
    getByUsername
}
function _makeid(length = 14) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}