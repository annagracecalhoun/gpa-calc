import { React, useEffect, useState } from "react";
import "../styles/MainPage.css";
import "../styles/AddCourse.css";
import Axios from 'axios';
import CourseDisplay from "./CourseDisplay";
import UserProfile from "./UserProfile";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
function MainPage(props) {

    const [studInfo, setStudInfo] = useState([]);
    const [coursesTaken, setcoursesTaken] = useState([]);
    const [termsList, settermsList] = useState([]);
    const [curTerm, setcurTerm] = useState('');
    const [curCourses, setcurCourses] = useState([])
    const [fetchedData, setfetchedData] = useState(false);
    const [cumGPA, setcumGPA] = useState(0);
    useEffect(() => {
        let corInfo = [];
        Axios.get('http://localhost:3001/api/getStudent').then((response) => {
            response.data.forEach(o => {
                if (o.computing_ID === props.compId) {
                    corInfo.push(o)
                }
            })

        });
        setStudInfo(corInfo);

        Axios.get('http://localhost:3001/api/takenClass').then((response) => {
            var corInfo2 = [];
            response.data.forEach(o => {
                if (o.computing_ID === props.compId) {
                    // console.log(o)
                    corInfo2.push(o);
                }
            })
            setcoursesTaken(corInfo2);
        });

        /* Axios.get('http://localhost:3001/api/gpaVal').then((response) => {
         setgpaLook(response); 
         }) */
    }, []);

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


    const changecurCourses = () => {
        var tempCourses = [];
        coursesTaken.forEach(o => {
            if (o.term_name === curTerm) {
                tempCourses.push(o);
            }
        })
        setcurCourses(tempCourses);
        //console.log(curCourses);
    }

    const changeTerm = (e) => {
        setcurTerm(e.target.value);
        changecurCourses();
    }

    const getcumGPA = (courses) => {
        Axios.get('http://localhost:3001/api/gpaVal').then((response) => {
            let totalCredits = 0;
            let cumPoints = 0;
            courses.forEach(course => {
                totalCredits += course.credits;
                response.data.forEach(grade => {
                    if (grade.letter_grade === course.letter_grade) {
                        cumPoints += (grade.GPA_value * course.credits)
                    }
                })
            })
            //console.log(cumPoints)
            //console.log(totalCredits)
            setcumGPA(cumPoints / totalCredits);
        })
        return cumGPA;
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

    /*
     <span><strong>Name: </strong>{studInfo[0].first_name} {studInfo[0].last_name}</span>
     <span><strong>Year:</strong> {studInfo[0].year}</span>
    <span><strong>Cumulative GPA:</strong> {studInfo[0].cumGPA}</span>
    */

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
                        <span className="GPAFirstLetter">{getcumGPA(coursesTaken).toFixed(2).toString()[0]}</span>
                        <span className="outOf">{getcumGPA(coursesTaken).toFixed(2).toString().slice(1, 4)} / 4.00</span>
                    </div>


                    {/* <Text style={styles.cumGPAFirstLetter}>{cumGPA.toString()[0]}
                        <Text style={styles.cumGPA}>{cumGPA.toString().slice(1, 4)} / 4.00</Text>
                    </Text> */}
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



            <div className="termClasses">
                {fetchedData ?
                    <div>
                        <div className="termSelect">
                            <span className="termSel">Select a Term</span>
                            <select onChange={changeTerm}>
                                {termsList.map((x) =>
                                    <option>{x}</option>)}
                            </select>
                            <button className="createButton"><Link to="/addCourse">Add Course</Link></button>
                        </div>
                        {curCourses.map((x, i) =>
                            <CourseDisplay key={i} compID={props.compId} courseSub={x.subject} courseNum={x.course_number} courseGrade={x.letter_grade} courseCreds={x.credits}></CourseDisplay>)}
                    </div>
                    : null}
            </div>


        </div>
    )
};

export default MainPage;