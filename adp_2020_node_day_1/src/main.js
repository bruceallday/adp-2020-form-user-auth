import express from 'express'
import { Pool } from 'pg'
import bcrypt from 'bcrypt'
import csurf from 'csurf'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())

app.use(express.json())
const csrfProtect = csurf({
    ignoreMethods : []
})

//---------------------COOKIE SESSION---------------------------------
var session = require('express-session');

app.use(session({
    store: new (require('connect-pg-simple')(session))(),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));
//---------------------COOKIE SESSION---------------------------------


const pool = new Pool()

const resgisterNewUser = async (password) => {

    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    // console.log("HASH" + hash)
    return (hash)
}

const onError = (e, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.status(500).json({ message: 'Unable to get cats' })
    } else {
        res.status(500).json({ message: e.message, stack: e.stack.split(/\n\s*/) })
    }
}

app.options("*", cors())

app.get('/', (req, res) => res.send('Hello World!'))

//-------------- BASIC GET REQUEST -----------------------------------------
app.get('/cats', csrfProtect, async (req, res) => {
    try {
        console.log(req.session)
        if (req.session.userID == null) {
            res.status(403).json({
                error: {message: "UNAUTHORIZED TO VIEW CATS"}
            })
            return
        }

        req.headers['csrf-token']

        const cats = await pool.query('SELECT * FROM cats')
        
        res.json( cats.rows ) 
    } catch (e) {
        onError(e, res)
    }
})
//-------------- BASIC GET REQUEST-----------------------------------------

//-------------- USER HASH CREATION -----------------------------------------
app.post('/signup/', async (req, res) => {

    const { name, password } = req.body

    if (name === null) {
        res.status(500).json({
            message: "'cat' param missing from JSON"
        })
        return
    }

    const hash = await resgisterNewUser(password)

    try {
        const userResult = await pool.query(
            `INSERT INTO users (name, password)
            VALUES ($1, $2)
            RETURNING name`,
            [name, hash])
        res.json(userResult.rows[0])
    } catch (e) {
        onError(e, res)
    }
})
//-------------- USER HASH CREATION -----------------------------------------

//-------------- USER HASH AUTHORISATION -----------------------------------------
app.post('/login',csurf({ ignoreMethods: ['POST'] }), async (req, res) => {

    const { name, password } = req.body

    try {
        const userResult = await pool.query(`
            SELECT * FROM users WHERE name=$1`,
            [name])

        const  user = userResult.rows[0]

        if (user == null) {
            res.status(403).json({
                message: "NOT AUTHORISED"
            })
            return
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword){
            res.status(403).send({
                error: { message: 'Incorrect username or password' }
            })
        }

        req.session.userID = user.id

        console.log("USERS IP ADRESS = " + req.ip)

        res.json({
            user: userResult.rows[0], 
            csrfToken: req.csrfToken()})
            
    } catch (e) {
        onError(e, res)
    }

})

//-------------- USER HASH AUTHORISATION -----------------------------------------

//----------------USER LOG OUT----------------------------------------------------

app.post('/logout', async (req, res) => {
    delete req.session.userID

    res.json({message: "LOGGED OUT"})
})

//----------------USER LOG OUT----------------------------------------------------

//----------------INSERTING A ROW INTO OUR CAT DATABASE WITH A POST REQUEST---------------------------
app.post('/cats/', async (req, res) => {
    const { cat } = req.body

    if (cat === null) {
        res.status(500).json({
            message: "'cat' param missing from JSON"
        })
        return
    }

    try {
        const catResult = await pool.query(
            `INSERT INTO cats (name, color)
                VALUES ($1, $2)
                RETURNING *
        `, [cat.name, cat.color])
        res.json(catResult.rows[0])
    } catch (e) {
        onError(e, res)
    }
})
//----------------INSERTING A ROW INTO OUR CAT DATABASE WITH A POST REQUEST------------

//---------------- EDITINGA A CAT BY USING A DYNAMIC URL:ID ---------------------------
app.put('/cats/:id', async (req, res) => {
    const { cat } = req.body

    if (cat === null) {
        res.status(500).json({
            message: "'cat' param missing from JSON"
        })
        return
    }
    try {
        const catUpdate = await pool.query(
            `UPDATE cats
            SET name = $1, color = $2
            WHERE id = $3
            RETURNING *
            `, [cat.name, cat.color, req.params.id]
        )
        res.json(catUpdate.rows[0])
    } catch (e) {
        onError(e, res)
    }
})

//---------------- EDITINGA A CAT BY USING A DYNAMIC URL:ID ---------------------------

//------------------------LISTENING TO THE PORT----------------------------------------
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


