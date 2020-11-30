const authService = require('./auth.service')

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send(err)
    }
}

async function signup(req, res) {
    const user = req.body
    try {
        await authService.signup(JSON.parse(JSON.stringify(user)))
        const loggedUser = await authService.login(user.username, user.password)
        req.session.user = loggedUser
        res.json(loggedUser)
    } catch (err) {
        res.status(500).send(err)
    }
}
async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}