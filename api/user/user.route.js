const express = require('express')
const { getUser, addUser, updateUser } = require('./user.controller')
const router = express.Router()

router.get('/:id', getUser)
router.put('/:id', updateUser)
router.post('/', addUser)


module.exports = router

