// npm install express body-parser my-sql nodemon cors
// https://www.youtube.com/watch?v=3YrOOia3-mo
const express = require('express')
const app = express();
const mysql = require('mysql')
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

const db = mysql.createConnection({
    host: 'mysql01.cs.virginia.edu',
    user: 'agc8a',
    password: 'ZT@mQ8wkAT6gEQX9',
    database: 'agc8a_gpa_calc'
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

app.get('/api/studMajor', (req, res) => {
    const getGpa = 'SELECT * FROM student_major;'
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

app.post('/api/delete', (req, res) => {
    const useName = req.body.useName; 
    const pw = req.body.pw; 
    
    const userDel = 'DELETE FROM user WHERE username = ? AND password = ?;'
     db.query(userDel, [useName, pw], (err, result) => {
         console.log(err); 
     })
 }); 

 app.post('/api/passUpdate', (req, res) => {
    const useName = req.body.useName; 
    const pw = req.body.pw; 
    
    const userDel = 'UPDATE user SET password = ? WHERE username = ?;'
     db.query(userDel, [pw, useName], (err, result) => {
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


 app.post('/api/delCourse', (req, res) => {
    const compID = req.body.compID; 
    const subject = req.body.subject; 
    const courseNum = req.body.courseNum; 
    const letGrade = req.body.grade; 
    
    const courseDel = 'DELETE FROM takes WHERE computing_ID = ? AND subject = ? AND course_number = ? AND letter_grade= ?;'
     db.query(courseDel, [compID, subject, courseNum, letGrade], (err, result) => {
         console.log(err); 
     })
 }); 

 app.post('/api/updateCourse', (req, res) => {
    const compID = req.body.compID; 
    const subject = req.body.subject; 
    const courseNum = req.body.courseNum; 
    const letGrade = req.body.grade; 
    
    const courseUp = 'UPDATE takes set letter_grade = ? WHERE computing_ID = ? AND subject = ? AND course_number = ?;'
     db.query(courseUp, [letGrade, compID, subject, courseNum], (err, result) => {
         console.log(err); 
     })
 }); 


app.get('/', (req, res) => {
})

app.listen(3001, () => {
    console.log("running on port 3001")
})

