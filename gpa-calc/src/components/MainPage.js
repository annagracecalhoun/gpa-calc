import {React, useEffect, useState} from "react"; 
import "../styles/MainPage.css"; 
import Axios from 'axios'; 

function MainPage (props) {
const [studInfo, setStudInfo] = useState([]); 
const [coursesTaken, setcoursesTaken] = useState([]); 
const [termsList, settermsList] = useState([]); 
const [curTerm, setcurTerm] = useState(''); 

    useEffect(()=> {
        // {params: {compID: props.compID}} 
        var corInfo = []; 
        Axios.get('http://localhost:3001/api/getStudent').then((response) => {
        response.data.forEach(o => {
            if (o.computing_ID === props.compId) {
                console.log(o)
                corInfo.push(o);
            }
        })
        setStudInfo(corInfo); 
       console.log(studInfo);
        });  
     }, []); 

     useEffect(() => {
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
        var tempTerms = []; 
        coursesTaken.forEach(o => {
            if (!tempTerms.includes(o.term_name)) {
                tempTerms.push(o.term_name); 
            }}); 
        settermsList(tempTerms); 
     }, []); 

     const changeTerm = (e) => {
         setcurTerm(e.target.value); 
     }
    
    return (
        <div className="mainOuter"> 
        <div className="accountHead">
        <span><strong>Username: </strong>{props.name}</span>
        <span><strong>Computing ID:</strong> {props.compId}</span>
        <span><strong>Name: </strong>{studInfo[0].first_name} {studInfo[0].last_name}</span>
        <span><strong>Year:</strong> {studInfo[0].year}</span>
        <span><strong>Cumulative GPA:</strong> {studInfo[0].cumGPA}</span>
        </div>
        
        <div className="termClasses">
        <select onChange={changeTerm}> 
            {termsList.map((x) => 
              <option>{x}</option>)}
            </select>
            </div>
        </div>
    )
}; 

export default MainPage; 