const userService = require('./user.service')

async function getUser(req, res) {
    const { id } = req.params
    const user = await userService.query(id)
    res.send(user)

}

async function addUser(req, res) {
    const user = await userService.add(req.body)
    res.send(user)
}

module.exports = {
    getUser,
    addUser
};