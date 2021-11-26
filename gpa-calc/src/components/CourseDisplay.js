import Axios from "axios";
import React from "react"; 
import "../styles/CourseDisplay.css"; 

function CourseDisplay (props) {
    const editCourse = () => {
        // figure out how to do this 
    }; 

    const delCourse = () => {
        // need to update the interface
        Axios.post('http://localhost:3001/api/delCourse', {compID: props.compID, subject: props.courseSub, courseNum: props.courseNum, grade: props.courseGrade}
        )
        // need to update list of courses on delete
    }

    return (
        <div>
            <div className="courseListing">
        <span><strong>Course Subject: </strong>{props.courseSub}</span>
        <span><strong>Course number: </strong>{props.courseNum}</span>
        <span><strong>Course grade: </strong>{props.courseGrade}</span>
        <span><strong>Course credits: </strong>{props.courseCreds}</span>
        <button className="editButton" onClick={editCourse}>Edit Course</button>
        <button className="editButton" onClick={delCourse}>Delete Course</button>
        </div>
        </div>
    )
}; 

export default CourseDisplay; 