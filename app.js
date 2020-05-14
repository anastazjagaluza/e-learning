const express = require('express')
const app = express()
const port = 3000
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
app.post('/signin', (req, res) => {
      con.query(`SELECT name, currentLesson FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, function (err, result, fields) {
        if (err) throw err;
        res.status(200).send(result);
    });
});
  

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



