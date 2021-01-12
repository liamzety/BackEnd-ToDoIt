
const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId

module.exports = {
    add,
    query,
    getByUsername,
    update
}

async function query(id) {
    try {
        const collection = await dbService.getCollection('users')
        return await collection.findOne({ "_id": ObjectId(id) })
    } catch (err) {
        console.log('Error, cannot find user', err)
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
    try {
        const collection = await dbService.getCollection('users')
        if (await getByUsername(user.username)) throw { msg: 'username taken.' }
        await collection.insertOne(user)
        return user
    } catch (err) {
        throw err
    }
}

async function update(user) {

    try {
        const collection = await dbService.getCollection('users')
        await collection.updateOne({ "_id": ObjectId(user._id) },
            { $set: { ...user, _id: ObjectId(user._id) } })
        return user
    } catch (err) {
        throw err
    }
}


