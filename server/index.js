// npm install express body-parser my-sql nodemon cors
// https://www.youtube.com/watch?v=3YrOOia3-mo
const express = require('express')
const app = express();
const mysql = require('mysql')
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'G96u9B7hjmbI7BH9 ',
    database: 'gpa_calc'
});

app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors()); 
app.use(express.json());
db.connect(); 

app.get('/api/getUser', (req, res) => {
    const sqlSel = "SELECT * FROM user"; 
    db.query(sqlSel, (err, result) => {
        res.send(result); 
    })
}
)

app.get('/api/getTerms', (req, res) => {
    const sqlSel = "SELECT * FROM term"; 
    db.query(sqlSel, (err, result) => {
        res.send(result); 
    })
}
)

app.get('/api/getStudent', (req, res) => {
   /* let compID = req.query.compID; 
    const getStud = 'SELECT * FROM student WHERE computing_ID = "' + compID + '";'; */
   const getStud= "SELECT * FROM student"; 
    db.query(getStud, (err, result) => {
        res.send(result); 
    })
})

app.get('/api/takenClass', (req, res) => {
    const getTakes = 'SELECT * FROM takes NATURAL JOIN term NATURAL JOIN course;'
    db.query(getTakes, (err, result) => {
        res.send(result); 
    })
})

app.get('/api/gpaVal', (req, res) => {
    const getGpa = 'SELECT * FROM gpa_lookup;'
    db.query(getGpa, (err, result) => {
        res.send(result); 
    })
})


app.post('/api/create', (req, res) => {
   const useName = req.body.useName; 
   const pw = req.body.pw; 
   
   const userInsert = 'INSERT INTO user (username, password) VALUES (?, ?);'
    db.query(userInsert, [useName, pw], (err, result) => {
        console.log(err); 
    })
}); 

app.post('/api/addCourse', (req, res) => {
    const compID = req.body.cid; 
    const courseName = req.body.courseName; 
    const courseNum = req.body.courseNum; 
    const termId = req.body.term; 
    const letGrade = req.body.grade; 
    
    const userInsert = 'INSERT INTO takes (computing_ID, subject, course_number, letter_grade, term_id) VALUES (?, ?, ?, ?, ?);'
     db.query(userInsert, [compID, courseName, courseNum, letGrade, termId], (err, result) => {
         console.log(err); 
     })
 }); 


app.get('/', (req, res) => {
})

app.listen(3001, () => {
    console.log("running on port 3001")
})

