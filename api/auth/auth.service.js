const bcrypt = require('bcrypt')
const userService = require('../user/user.service')

const saltRounds = 10

async function login(username, password) {
    if (!username || !password) return Promise.reject('username and password are required!')

    const user = await userService.getByUsername(username)
    if (!user) throw { msg: 'invalid username or password.' }
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw { msg: 'invalid username or password.' }
    delete user.password;
    return user;
}

async function signup(user) {
    if (!user.password || !user.username) return Promise.reject('username and password are required!')
    user.password = await bcrypt.hash(user.password, saltRounds)
    return await userService.add(user)
}

module.exports = {
    signup,
    login,
}