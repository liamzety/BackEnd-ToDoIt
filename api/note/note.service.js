
const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId

module.exports = {
    remove,
    add,
    update
}

async function add(note, user) {
    note.lastUpdatedAt = Date.now();
    note._id = _makeid()
    try {
        const collection = await dbService.getCollection('users')
        await collection.updateOne({ "_id": ObjectId(user._id) },
            {
                $set:
                {
                    ...user,
                    _id: ObjectId(user._id),
                    notes: [
                        ...user.notes,
                        note
                    ]
                }
            })
        return await _getById(user)
    } catch (err) {
        console.log('Error, cannot create note', err)
        throw err
    }
}

async function update(note, user) {
    const collection = await dbService.getCollection('users')
    note.lastUpdatedAt = Date.now()
    const userNotes = [...user.notes]
    userNotes.splice(userNotes.findIndex(_note => _note._id === note._id), 1, note)
    userNotes.sort((a, b) => parseFloat(b.lastUpdatedAt) - parseFloat(a.lastUpdatedAt));
    console.log('userNotes', userNotes)
    try {
        await collection.updateOne({ "_id": ObjectId(user._id) },
            {
                $set:
                {
                    ...user,
                    _id: ObjectId(user._id),
                    notes: userNotes

                }
            })
        return await _getById(user)
    } catch (err) {
        console.log('Error, cannot update note', err)
        throw err
    }
}

async function remove(noteId, user) {
    const collection = await dbService.getCollection('users')
    await collection.updateOne({ "_id": ObjectId(user._id) },
        {
            $set:
            {
                ...user,
                _id: ObjectId(user._id),
                notes: user.notes.filter(note => note._id !== noteId),
            }
        })
    return _getById(user)
}


async function _getById(user) {
    const collection = await dbService.getCollection('users')
    return await collection.findOne({ "_id": ObjectId(user._id) })
}
function _makeid(length = 14) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}