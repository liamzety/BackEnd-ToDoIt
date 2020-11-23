const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getNotes,
    getNote,
    addNote,
    updateNote,
    removeNote } = require('./note.controller')
const router = express.Router()

router.get('/', getNotes)
router.get('/:id', getNote)
router.put('/:id', updateNote)
router.post('/', addNote)
router.delete('/:id', removeNote)

module.exports = router


