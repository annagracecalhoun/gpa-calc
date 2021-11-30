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
  const [CID, setCID] = useState('');


  useEffect(() => {
    const tempTerms = []
    Axios.get('http://localhost:3001/api/getTerms').then(response => {
      response.data.forEach(element => {
        if (element.term_id < 16) {
          tempTerms.push(element.term_name + ": " + element.term_id)
        }
      });
      console.log(tempTerms)
      settermList(tempTerms)
    })
  }, []);

  const changeLetter = (e) => {
    setCourseLetter(e.target.value);
  }

  const changeCID = (e) => {
    setCID(e.target.value);
  }

  const changeNum = (e) => {
    setCourseNumber(e.target.value);
  }

  const changeTerm = (e) => {
    setTermId(e.target.value.split(': ')[1]);
  }

  const changeGrade = (e) => {
    setGrade(e.target.value);
  }

  const addCourse = () => {
    Axios.post('http://localhost:3001/api/addCourse', {
      cid: CID,
      courseName: courseLetter,
      courseNum: courseNumber,
      grade: letterGrade,
      term: termId
    }).then(() => {
      setCID('')
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
          <label>Computing ID</label>
          <input type="text" name="CID" onChange={changeCID}></input>
          <label>Course Name</label>
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