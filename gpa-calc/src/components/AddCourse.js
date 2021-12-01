import { React, useEffect, useState } from "react";
import Axios from 'axios';
import "../styles/AddCourse.css";
import { Link } from "react-router-dom";

function AddCourse(props) {
  const [courseLetter, setCourseLetter] = useState('');
  const [courseNumber, setCourseNumber] = useState(0);
  const [termId, setTermId] = useState(1);
  const [letterGrade, setGrade] = useState('A+');
  const [termList, settermList] = useState([]);


  let gradeList = ['A+', 'A', 'A-', 
  'B+', 'B', 'B-', 
  'C+', 'C', 'C-',
  'D+', 'D', 'D-', 
  'F', 'CR'
  ]

  useEffect(() => {
    const tempTerms = []
    Axios.get('https://dry-beach-67057.herokuapp.com/api/getTerms').then(response => {
      console.log(response);
      response.data.forEach(element => {
          tempTerms.push(element.term_name)
      });

      console.log(tempTerms);
      settermList(tempTerms);
    })
  }, []);

  const changeLetter = (e) => {
    setCourseLetter(e.target.value);
  }

  const changeNum = (e) => {
    setCourseNumber(e.target.value);
  }

  const changeTerm = (e) => {
    // console.log(e.target.value);
    Axios.get('https://dry-beach-67057.herokuapp.com/api/getTerms').then((response) => {
            const targetSet = response.data.find((o) => o.term_name === e.target.value);
           // console.log(targetSet.term_id);
            setTermId(targetSet.term_id);
    });
  }

  const changeGrade = (e) => {
    setGrade(e.target.value);
  }

  // Check if everything is provided
  const validate = () => {
    if (courseNumber != 0 && courseLetter != '') {
      console.log("Everything provided")
    } else {
      return false;
    }
  }

  const addCourse = () => {

    if (validate()) {
      Axios.post('https://dry-beach-67057.herokuapp.com/api/addCourse', {
        cid: localStorage.compID,
        courseName: courseLetter,
        courseNum: courseNumber,
        grade: letterGrade,
        term: termId
      }).then(() => {
        setCourseLetter('');
        setCourseNumber(0);
        setGrade('');
        setTermId(0);
      });

    } else {
      alert('Please provide all necessary information.')
    }
  }


  return (
    <div>
      <div className="accountHead">
        <span><strong>Username: </strong>{props.name}</span>
        <span><strong>Computing ID:</strong> {props.compId}</span>
      </div>

      
        <div className="form">

          <div className="container">
            <label className="text">Course Name</label>
            <input className="input" type="text" name="Subject" placeholder="CS, SPAN, COMM, etc." onChange={changeLetter}></input>
          </div>

          <div className="container">
            <label className="text">Course Number</label>
            <input className="input" type="text" name="Number"  placeholder="1010" onChange={changeNum}></input>
          </div>
    
          <div className="container"> 
            <label className="text">Letter Grade</label>
            <select className="input" onChange={changeGrade}>
              {gradeList.map((grade) =>
                <option key={grade}>{grade}</option>)}
            </select>
          </div>


          <div className="container">  
            <label className="text">Term</label>
            <select className="input" onChange={changeTerm}>
              {termList.map((term) =>
                <option key={term}>{term}</option>)}
            </select>
          </div>
          </div>


          <button className="createButton"><Link to="/">Go back</Link></button>
          <button className="createButton" onClick={addCourse}><Link to="/">Add Course</Link></button>
      
      </div>


  )
};

export default AddCourse;