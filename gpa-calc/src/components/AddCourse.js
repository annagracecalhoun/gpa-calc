import { React, useEffect, useState } from "react";
import Axios from 'axios';
import "../styles/AddCourse.css";
import { Link } from "react-router-dom";

function AddCourse(props) {
  const [courseLetter, setCourseLetter] = useState('');
  const [courseNumber, setCourseNumber] = useState(0);
  const [termId, setTermId] = useState(0);
  const [letterGrade, setGrade] = useState('');
  const [termList, settermList] = useState([]);


  useEffect(() => {
    const tempTerms = []
    Axios.get('http://localhost:3001/api/getTerms').then(response => {
      console.log(response);
      response.data.forEach(element => {
          tempTerms.push(element.term_name)
      });
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
    Axios.get('http://localhost:3001/api/getTerms').then((response) => {
            const targetSet = response.data.find((o) => o.term_name === e.target.value);
           // console.log(targetSet.term_id);
            setTermId(targetSet.term_id);
    });
  }

  const changeGrade = (e) => {
    setGrade(e.target.value);
  }

  const addCourse = () => {
    Axios.post('http://localhost:3001/api/addCourse', {
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
  }


  return (
    <div>
      <div className="accountHead">
        <span><strong>Username: </strong>{props.name}</span>
        <span><strong>Computing ID:</strong> {props.compId}</span>
      </div>
        <div className="form">
          <label>Course Name (CS, APMA, SPAN, etc)</label>
          <input type="text" name="Subject" onChange={changeLetter}></input>
          <label>Course Number</label>
          <input type="text" name="Number" onChange={changeNum}></input>
          <label>Letter Grade</label>
          <input type="text" name="Grade" onChange={changeGrade}></input>
          <label>Term ID</label>
          <select onChange={changeTerm}>
                            {termList.map((x) =>
                                <option>{x}</option>)}
                        </select>
          <button className="createButton" onClick={addCourse}><Link to="/">Add Course</Link></button>
          <button className="createButton"><Link to="/">Go back</Link></button>
        </div>
      </div>


  )
};

export default AddCourse;