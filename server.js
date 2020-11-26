const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 3030;
const http = require('http').createServer(app);

// Express App Config
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'puki muki secret stuff',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


const corsOptions = {
    origin: ['https://scribepad-6e8af.web.app', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
};
app.use(cors(corsOptions));


const authRoutes = require('./api/auth/auth.routes')
const addNoteRoutes = require('./api/note/note.route')
const addUserRoutes = require('./api/user/user.route')


// routes
app.use('/api/auth', authRoutes)
app.use('/api/note', addNoteRoutes)
app.use('/api/user', addUserRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

http.listen(port, () => {
    (`listening on http://localhost:${port}`)
})


