import { React, useEffect, useState } from "react";
import Axios from 'axios';
import "../styles/AddCourse.css";


function AddCourse(props){
    const [courseLetter, setCourseLetter] = useState(''); 
    const [courseNumber, setCourseNumber] = useState(0); 
    const [termId, setTermId] = useState(0); 
    const [letterGrade, setGrade] = useState(''); 

  
   
    const changeLetter = (e) => {
      setCourseLetter(e.target.value); 
    }
  
    const changeNum = (e) => {
      setCourseNumber(e.target.value); 
    }

    const changeTerm = (e) => {
        setTermId(e.target.value); 
      }
    
    const changeGrade = (e) => {
        setGrade(e.target.value); 
    }

    const addCourse = () => {
        Axios.post('', {cid: props.compId, courseName: courseLetter, courseNum: courseNumber, grade: letterGrade, term: termId}).then(() => {
          setCourseLetter(''); 
          setCourseNumber(0); 
          setGrade('');
          setTermId(0);
      
    
        }); 
      }
  

return(
    <div>
        <div className = "accountHead">
    <span><strong>Username: </strong>{props.name}</span>
    <span><strong>Computing ID:</strong> {props.compId}</span>
    </div>
    <div className="form">
    <label>Course Name</label>
    <input type="text" name="Subject" onChange={changeLetter}></input>
    <label>Course Number</label>
    <input type="text" name="Number" onChange={changeNum}></input>
    <label>Term ID</label>
    <input type="text" name="Term ID" onChange={changeTerm}></input>
    <label>Letter Grade</label>
    <input type="text" name="Grade" onChange={changeGrade}></input>
    <button className = "createButton" onClick={addCourse}>Add Course</button>
    </div>
    </div>


)
};

export default AddCourse;