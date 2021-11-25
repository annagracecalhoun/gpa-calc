import { React, useEffect, useState } from "react";
import "../styles/MainPage.css";
import Axios from 'axios';
import CourseDisplay from "./CourseDisplay";
import UserProfile from "./UserProfile";

function MainPage(props) {

    const [studInfo, setStudInfo] = useState([]);
    const [coursesTaken, setcoursesTaken] = useState([]);
    const [termsList, settermsList] = useState([]);
    const [curTerm, setcurTerm] = useState('');
    const [curCourses, setcurCourses] = useState([])
    const [fetchedData, setfetchedData] = useState(false); 

    useEffect(() => {
        let corInfo = [];
        Axios.get('http://localhost:3001/api/getStudent').then((response) => {
            response.data.forEach(o => {
                if (o.computing_ID === props.compId) {
                    console.log(o)
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
        console.log(curCourses);
    }

    const changeTerm = (e) => {
        setcurTerm(e.target.value);
        changecurCourses();
    }



    const getTotalCredits = (courses) => {
        let totalCredits = 0;
        courses.forEach(course => {
            totalCredits += course.credits;
        })
        return totalCredits;
    }
    const getTotalCourses= (courses) => {
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
            <div className="accountHead">
                <UserProfile username={props.name}/>
                <span><strong>Username: </strong>{props.name}</span>
                <span><strong>Computing ID:</strong> {props.compId}</span>
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
                {fetchedData ? <div>
                    <div className="termSelect">
            <span className="termSel">Select a Term</span>
                <select onChange={changeTerm}>
                    {termsList.map((x) =>
                        <option>{x}</option>)}
                </select> 
                </div>
                {curCourses.map((x, i) =>
                    <CourseDisplay key={i} courseSub={x.subject} courseNum={x.course_number} courseGrade={x.letter_grade} courseCreds={x.credits}></CourseDisplay>)}
                   </div> : null}
            </div>
        </div>
    )
};

export default MainPage;