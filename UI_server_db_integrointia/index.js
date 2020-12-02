const express = require('express')
const cors = require('cors')
const database = require('./database')
const bodyParser = require('body-parser')
const app = express()
const port = 4000
app.use(cors())
app.use(bodyParser.json())


app.get('/exams', (req, res, next) => {
    database.query("select * from exams", (err, result) => {
        if(err) {
            return next(err)
        }
        res.send(result.rows)
    })
})

app.get('/questions', (req, res, next) => {
    database.query("select * from questions order by id", (err, result) => {
        if(err) {
            return next(err)
        }
        res.send(result.rows)
    })
})

app.get('/answers', (req, res, next) => {
    database.query("select * from answers order by id", (err, result) => {
        if(err) {
            return next(err)
        }
        res.send(result.rows)
    })
})


//Teen postin ja deleten huomisena etäpäivänä 3.12. Meni niin paljon aikaa tänään tietokannan datan muotoilemiseen
//käyttöliittymässä ettei muuta ehtinytkään tekemään...
app.post('/', (req, res) => {
    res.send('Hello, World! POST')
})

app.put('/', (req, res) => {
    res.send('Hello, World! PUT')
})

app.delete('/', (req, res) => {
    res.send('Hello, World! DELETE')
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
