import React from "react"; 
import "../styles/CourseDisplay.css"; 


function CourseDisplay (props) {
    return (
        <div>
            <div className="courseListing">
        <span><strong>Course Subject: </strong>{props.courseSub}</span>
        <span><strong>Course number: </strong>{props.courseNum}</span>
        <span><strong>Course grade: </strong>{props.courseGrade}</span>
        <span><strong>Course credits: </strong>{props.courseCreds}</span>
        </div>
        </div>
    )
}; 

export default CourseDisplay; 