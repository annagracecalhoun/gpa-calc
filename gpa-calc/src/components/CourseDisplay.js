import Axios from "axios";
import {React, useState} from "react"; 
import "../styles/CourseDisplay.css"; 

function CourseDisplay (props) {
    const [editVis, seteditVis] = useState(false); 
    const [cGrade, setcGrade] = useState(props.courseGrade); 
    const[delCourse2, setdelCourse2] = useState(false);  
 
    const editCourse = () => {
        seteditVis(true); 
        // figure out how to do this 
    }; 

    const editCourse2 = () => {
        Axios.post('http://localhost:3001/api/updateCourse', {compID: props.compID, subject: props.courseSub, courseNum: props.courseNum, grade: cGrade})
        seteditVis(false); 
    }

    const delCourse = () => {
        // need to update the interface
        Axios.post('http://localhost:3001/api/delCourse', {compID: props.compID, subject: props.courseSub, courseNum: props.courseNum, grade: props.courseGrade})
        setdelCourse2(true); 
        // need to re-update courses
    }

    const changeGrade = (e) => {
        setcGrade(e.target.value); 
    }; 


    return (
        <div>
            {!delCourse2?
            <div className="courseListing">
        <span><strong>Course Subject: </strong>{props.courseSub}</span>
        <span><strong>Course number: </strong>{props.courseNum}</span>
        <span><strong>Course grade: </strong>{props.courseGrade}</span>
        <span><strong>Course credits: </strong>{props.courseCreds}</span>
        <button className="editButton" onClick={editCourse}>Edit Grade</button>
        <button className="editButton" onClick={delCourse}>Delete Course</button>
        </div>: null}
        {editVis && !delCourse2?<div>
            <label>Course Grade</label>
    <input type="text" name="Grade" onChange={changeGrade}></input>
    <button className = "editCourse" onClick={editCourse2}>Save Grade</button>
        </div>: null}
        </div>
    )
}; 

export default CourseDisplay; 