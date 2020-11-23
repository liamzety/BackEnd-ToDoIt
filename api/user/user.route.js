const express = require('express')
const { getUser, addUser } = require('./user.controller')
const router = express.Router()

router.get('/:id', getUser)
router.post('/', addUser)


module.exports = router

