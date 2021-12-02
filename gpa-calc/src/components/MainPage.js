import { React, useEffect, useState } from "react";
import "../styles/MainPage.css";
import "../styles/AddCourse.css";
import Axios from 'axios';
import CourseDisplay from "./CourseDisplay";
import UserProfile from "./UserProfile";
import {
    Link
} from "react-router-dom";
function MainPage(props) {

    // const [studInfo, setStudInfo] = useState([]);
    const [coursesTaken, setcoursesTaken] = useState([]);
    const [termsList, settermsList] = useState([]);
    const [curCourses, setcurCourses] = useState([])
    const [fetchedData, setfetchedData] = useState(false);

    useEffect(() => {
        
        Axios.get('https://dry-beach-67057.herokuapp.com/api/takenClass').then((response) => {
            let corInfo2 = [];
            response.data.forEach(o => {
                if (o.computing_ID === props.compId) {
                    corInfo2.push(o);
                }
            })
            setcoursesTaken(corInfo2);
        });
        
        /* Axios.get('http://localhost:3001/api/gpaVal').then((response) => {
            setgpaLook(response); 
        }) */
    }, [props.compId]);

    useEffect(() => {
        var tempTerms = [];
        coursesTaken.forEach(o => {
            if (!tempTerms.includes(o.term_name)) {
                tempTerms.push(o.term_name);
            }
        });
        settermsList(tempTerms);
        setfetchedData(true);
    }, [coursesTaken]);

    // Calculating Cum. GPA
    useEffect(() => {
        Axios.get('https://dry-beach-67057.herokuapp.com/api/gpaVal').then((response) => {
            let totalCredits = 0;
            let cumPoints = 0;
            coursesTaken.forEach(course => {
                totalCredits += course.credits;
                response.data.forEach(grade => {
                    if (grade.letter_grade === course.letter_grade) {
                        cumPoints += (grade.GPA_value * course.credits)
                    }
                })
            })
            localStorage.setItem('cumGPA', cumPoints / totalCredits);            
        })

    }, [coursesTaken]);



    const getcumGPA = () => {
        return parseFloat(localStorage.cumGPA).toFixed(2);
    }

    const changecurCourses = (e) => {
        let currentTerm = e.target.value;
        let tempCourses = [];
        coursesTaken.forEach(o => {
            if (o.term_name === currentTerm) {
                tempCourses.push(o);
            }
        })
        setcurCourses(tempCourses);
    }

    const getTotalCredits = (courses) => {
        let totalCredits = 0;
        courses.forEach(course => {
            totalCredits += course.credits;
        })
        return totalCredits;
    }
    const getTotalCourses = (courses) => {
        let totalCourses = 0;
        courses.forEach(course => {
            totalCourses++;
        })
        return totalCourses;
    }
    const getTotalTerms = (terms) => {
        let totalTerms = 0;
        terms.forEach(course => {
            totalTerms++;
        })
        return totalTerms;
    }

    return (
        <div className="mainOuter">


            <div>
                <div className="header">
                    <UserProfile username={props.name} />
                    <span><strong>Username: </strong>{props.name}</span>
                    <span><strong>Computing ID:</strong> {props.compId}</span>
                </div>
                <div className="line"> </div>
            </div>



            <div className="gpaBox">
                <div className="totalsBox">
                    <span className="left">Cumulative GPA</span>
                    <div className="right">
                        <span className="GPAFirstLetter">{
                        getcumGPA().toString()[0]}</span>
                        <span className="outOf">{getcumGPA().toString().slice(1, 4)} / 4.00</span>
                    </div>
                </div>
            </div>


            <div className="totalsInfo">
                {/*  Total Courses */}
                <div className="totalsBox">
                    <h1 className="top">Courses</h1>
                    <h1 className="mid">{getTotalCourses(coursesTaken)}</h1>
                    <h1 className="bottom">Taken to date</h1>
                </div>
                {/*  Total Credits*/}
                <div className="totalsBox">
                    <h1 className="top">Credits</h1>
                    <h1 className="mid">{getTotalCredits(coursesTaken)}</h1>
                    <h1 className="bottom">Earned in total</h1>
                </div>
                {/*  Total Terms */}
                <div className="totalsBox">
                    <h1 className="top">Terms</h1>
                    <h1 className="mid">{getTotalTerms(termsList)}</h1>
                    <h1 className="bottom">Completed</h1>
                </div>
            </div>


            <div className="termClasses" >
                {fetchedData ? <div>
                    <div className="termSelect">
                        <span className="termSel" >Select a Term</span>
                        <select style={{width: "150px", height:"50px"}} onChange={changecurCourses}>
                            {termsList.map((x) =>
                                <option key={x.toString()}>{x}</option>)}
                        </select>
                        <button className="createButton" style={{marginTop: "5px"}}><Link to="/addCourse">Add Course</Link></button>
                    </div>

                    {curCourses.map((course, i) =>
                        <CourseDisplay 
                            key={(i + course.subject + course.course_number).toString()} 
                            compID={props.compId} 
                            courseSub={course.subject} 
                            courseNum={course.course_number} 
                            courseGrade={course.letter_grade} 
                            courseCreds={course.credits}
                        ></CourseDisplay>
                    )}
                </div> : null}
            </div>
        </div>
    )
};

export default MainPage;