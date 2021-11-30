import Axios from "axios";
import {React, useState, useEffect} from "react"; 
import "../styles/CourseDisplay.css"; 

function CourseDisplay (props) {

    const [editVis, seteditVis] = useState(false); 
    const [courseGrade, setcourseGrade] = useState(props.courseGrade); 
    const[deleteCourseStatus, setdeleteCourseStatus] = useState(false);

    console.log(props.courseSub, props.courseNum, props.courseGrade);
 
    const editCourse = () => {
        seteditVis(true); 
    }; 

    const changeGrade = (e) => {
        setcourseGrade(e.target.value); 
    }; 

    const saveGradeChange = () => {
        console.log(courseGrade);

        Axios.post('http://localhost:3001/api/updateCourse', {compID: props.compID, subject: props.courseSub, courseNum: props.courseNum, grade: courseGrade})
        seteditVis(false); 

        // update cum. GPA
        updateCumGPA();
    }

    const updateCumGPA = () => {
        // Get courses taken with their update grades
        let cTaken = [];
        Axios.get('http://localhost:3001/api/takenClass').then((response) => {
            response.data.forEach(o => {
                if (o.computing_ID === props.compID) {
                    cTaken.push(o);
                }
            })
        });


        // console.log(cTaken);

        Axios.get('http://localhost:3001/api/gpaVal').then((response) => {
            let totalCredits = 0;
            let cumPoints = 0;
            cTaken.forEach(course => {
                totalCredits += course.credits;
                response.data.forEach(grade => {
                    if (grade.letter_grade === course.letter_grade) {
                        cumPoints += (grade.GPA_value * course.credits)
                    }
                })
            })
            localStorage.setItem('cumGPA', cumPoints / totalCredits);
            
            //console.log("GPA after Save", localStorage.cumGPA);

        });
    }


    const delCourse = () => {
        // need to update the interface
        Axios.post('http://localhost:3001/api/delCourse', {compID: props.compID, subject: props.courseSub, courseNum: props.courseNum, grade: courseGrade})
        setdeleteCourseStatus(true); 
        // need to re-update courses
    }


    return (
        <div>
            {!deleteCourseStatus?
            <div className="courseListing">
                <span><strong>Course Subject: </strong>{props.courseSub}</span>
                <span><strong>Course number: </strong>{props.courseNum}</span>
                <span><strong>Course grade: </strong>{courseGrade}</span>
                <span><strong>Course credits: </strong>{props.courseCreds}</span>

                <button className="editButton" onClick={editCourse}>Edit Grade</button>
                <button className="editButton" onClick={delCourse}>Delete Course</button>
        </div>: null}
        {editVis && !deleteCourseStatus?<div>
            <label>Course Grade</label>
    <input type="text" name="Grade" onChange={changeGrade}></input>

    {/* Change this to drop down */}
    <button className = "editCourse" onClick={saveGradeChange}>Save Grade</button>
        </div>: null}
        </div>
    )
}; 

export default CourseDisplay; 