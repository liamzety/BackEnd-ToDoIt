const noteService = require("./note.service");

// GET LIST
async function getNotes(req, res) {
    const notes = await noteService.query()
    res.send(notes)
}
// GET SINGLE
async function getNote(req, res) {
    const note = await noteService.getById(req.params.id)
    res.send(note)
}
// DELETE
async function removeNote(req, res) {
    const updatedUser = await noteService.remove(req.params.id, req.body.user)
    res.send(updatedUser)

}
// CREATE
async function addNote(req, res) {
    const { note, user } = req.body
    const updatedUser = await noteService.add(note, user)
    res.send(updatedUser)
}

// UPDATE
async function updateNote(req, res) {
    const { note, user } = req.body
    const updatedUser = await noteService.update(note, user)
    res.send(updatedUser)
}


module.exports = {
    getNotes,
    getNote,
    addNote,
    updateNote,
    removeNote
}
