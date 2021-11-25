import React from "react"; 
import "../styles/CourseDisplay.css"; 


function CourseDisplay (props) {
    const editCourse = () => {
        // figure out how to do this 
    }; 

    return (
        <div>
            <div className="courseListing">
        <span><strong>Course Subject: </strong>{props.courseSub}</span>
        <span><strong>Course number: </strong>{props.courseNum}</span>
        <span><strong>Course grade: </strong>{props.courseGrade}</span>
        <span><strong>Course credits: </strong>{props.courseCreds}</span>
        <button className="editButton" onClick={editCourse}>Edit Course</button>
        </div>
        </div>
    )
}; 

export default CourseDisplay; 