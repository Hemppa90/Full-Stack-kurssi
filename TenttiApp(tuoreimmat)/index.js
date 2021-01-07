const express = require('express')
const cors = require('cors')
const database = require('./database')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
}))

//------------------------------------------------------------------------------------
//GET---------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

app.get('/exams', (req, res, next) => {
    database.query("select * from exams order by placing_order;", (err, result) => {
        if(err) {
            return next(err)
        }
        res.send(result.rows)
    })
})

app.get('/questions', (req, res, next) => {
    database.query("select * from questions order by placing_order;", (err, result) => {
        if(err) {
            return next(err)
        }
        res.send(result.rows)
    })
})

app.get('/answers', (req, res, next) => {
    database.query("select * from answers order by placing_order;", (err, result) => {
        if(err) {
            return next(err)
        }
        res.send(result.rows)
    })
})

//------------------------------------------------------------------------------------
//POST--------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

//Lisätään tentti.
app.post('/exams/:id/:exam/', (req, res, next) => {
    database.query("insert into exams (id, exam) values ($1, $2);", [req.params.id, req.params.exam], (err, result) => {
        if(err) {
            return next(err)
        }
        res.send(result.rows)
    })
    
})

//Lisätään kysymys.
app.post('/questions/:id/:question/:exam_id', (req, res, next) => {
    database.query("insert into questions (id, question, exam_id) values ($1, $2, $3);", [req.params.id, req.params.question, req.params.exam_id], (err, result) => {
        if(err) {
            return next(err)
        }
        res.send(result.rows)
    })
    
})

//Lisätään vastaus.
app.post('/answers/:id/:answer/:user_choice/:correctness/:question_id', (req, res, next) => {
    database.query("insert into answers (id, answer, user_choice, correctness, question_id) values ($1, $2, $3, $4, $5);", [req.params.id, req.params.answer, req.params.user_choice, req.params.correctness, req.params.question_id], (err, result) => {
        if(err) {
            return next(err)
        }
        res.send(result.rows)
    })
    
})

//Lisätään uusi käyttäjä rekisteröitymisen yhteydessä.
app.post('/users/:id/:user/:email/:password/:register_time/:is_admin', (req, res, next) => {
    database.query("insert into users (id, user, email, password, register_time, is_admin) values ($1, $2, $3, $4, $5, $6);", 
    [req.params.id, req.params.user, req.params.email, req.params.password, req.params.register_time, req.params.is_admin], (err, result) => {
        if(err) {
            return next(err)
        }
        res.send(result.rows)
    })
    
})

//------------------------------------------------------------------------------------
//PUT---------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

//Muutetaan tentin nimeä.
app.put('/exams/:id/:exam/', (req, res, next) => {
    database.query("update exams set exam = $2 where id = $1;", [req.params.id, req.params.exam], (err, result) => {
        if(err) {
            return next(err)
        }
        res.send('Hello, World! PUT')
    })
    
})

//Muutetaan kysymystä.
app.put('/questions/:id/:question/', (req, res, next) => {
    database.query("update questions set question = $2 where id = $1;", [req.params.id, req.params.question], (err, result) => {
        if(err) {
            return next(err)
        }
        res.send('Hello, World! PUT')
    })
    
})

//Muutetaan vastausta.
app.put('/answers/:id/:answer/', (req, res, next) => {
    database.query("update answers set answer = $2 where id = $1;", [req.params.id, req.params.answer], (err, result) => {
        if(err) {
            return next(err)
        }
        res.send('Hello, World! PUT')
    })
    
})

//Muutetaan vastauksen oikeellisuutta.
app.put('/answers/:id/:correctness/:question_id', (req, res, next) => {
    database.query("update answers set correctness = $2 where id = $1 and question_id = $3;", [req.params.id, req.params.correctness, req.params.question_id], (err, result) => {
        if(err) {
            return next(err)
        }
        res.send('Hello, World! PUT')
    })
    
})

//Muutetaan käyttäjän valintaa vastauksesta.
app.put('/answers/:id/:answer/:user_choice/:question_id', (req, res, next) => {
    database.query("update answers set user_choice = $3 where id = $1 and question_id = $4 and answer = $2;", [req.params.id, req.params.answer, req.params.user_choice, req.params.question_id], (err, result) => {
        if(err) {
            return next(err)
        }
        res.send('Hello, World! PUT')
    })
    
})

//------------------------------------------------------------------------------------
//DELETE------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

//Poistetaan tentti.
app.delete('/exams/:exam/', (req, res, next) => {
    database.query("delete from exams where exam = $1;", [req.params.exam], (err, result) => {
        if(err) {
            return next(err)
        }
    })
    res.send('Examin poisto onnistui!')
})

//Poistetaan kysymys.
app.delete('/questions/:question/', (req, res, next) => {
    database.query("delete from questions where question = $1;", [req.params.question], (err, result) => {
        if(err) {
            return next(err)
        }
    })
    res.send('Questionin poisto onnistui!')
})

//Poistetaan vastaus.
app.delete('/answers/:answer/', (req, res, next) => {
    database.query("delete from answers where answer = $1;", [req.params.answer], (err, result) => {
        if(err) {
            return next(err)
        }
    })
    res.send('Answerin poisto onnistui!')
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
