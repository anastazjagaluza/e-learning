const express = require('express')
const app = express()
const port = 3001
const bodyParser = require("body-parser") // to retrieve form data
const cors = require('cors') // to fix cross-cors requests
const mysql = require('mysql');


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "elearning"
  });  

app.use(cors())
app.use(bodyParser.json())
app.post('/login', (req, res) => {
      con.query(`SELECT currentLesson, id FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, function (err, result, fields) {
        if (err){
          res.status(500).send();
        }  
        if(result.length == 0){
          res.status(404).send();
        }
        else{
          let first = result[0].currentLesson.replace('.', '');
          let second = Math.floor(Math.random() * 99);
          let third = result[0].id * 13;
          let session = first+second+third;
        res.status(200).send(session);
      }
    });
});

app.post('/signup', (req, res)=>{
  con.query(`SELECT name FROM users WHERE email = '${req.body.email}'`, function(err, result, fields) {
    if (err){
      res.status(500).send();
    }  
    if(result.length > 0){
      res.status(302).send("This is taken");
    }
    else{
      con.query(`INSERT INTO users VALUES(null, '${req.body.name}', '${req.body.email}', '${req.body.password}', '1.1')`, function(err, result, fields) {
       
      })
      
      con.query(`SELECT currentLesson, id FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, function (err, result, fields) {
        let first = result[0].currentLesson.replace('.', '');
        let second = result[0].id * 13;
        let session = first+second;
        res.status(200).send(session);
      })
    }
  }) 
});
 

app.post('/profile', (req, res) => {
  con.query(`SELECT name, email, password FROM users WHERE id = '${req.body.userId}'`, function (err, result, fields) {
  if(err){
    res.status(500).send();
  }
  res.status(200).send(result);
});
});

app.post('/update', (req, res)=> {
  con.query(`UPDATE users SET name = '${req.body.name}', password= '${req.body.password}', email = '${req.body.email}'  WHERE id = '${req.body.userId}'`, function(err, result, fields){
    if (err){
      res.status(500).send();
    }  
  res.status(200).send();
  })
})

app.post('/updateLesson', (req, res)=> {
  con.query(`UPDATE users SET currentLesson = '${req.body.currentLesson}' WHERE id = '${req.body.userid}'`, function(err, result, fields){
  res.status(200);
  })
})

app.post('/delete', (req, res)=>{
  con.query(`DELETE FROM users WHERE id = ${req.body.userId}`, function(err, result, fields){
    if (err) {
      res.status(500).send();
    }
    res.status(200);
    })
})

app.get('/overview', (req, res)=>{
  con.query(`SELECT * FROM overviewall`, function(err, result, fields){
    if(err){
      res.status(500).send();
    }
    res.status(200).send(result)
  })
})

app.get('/lesson', (req, res)=>{
  con.query(`SELECT * FROM learningdata WHERE topicId=${req.query.lessonId.substring(0, 1)}`, function(err, result, fields){
    res.status(200).send(result);
  })
})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))



