import {React, useEffect, useState} from "react"; 
import "../styles/MainPage.css"; 
import Axios from 'axios'; 

function MainPage (props) {
const [studInfo, setStudInfo] = useState([]); 

    useEffect(()=> {
        // {params: {compID: props.compID}} 
        Axios.get('http://localhost:3001/api/getStudent').then((response) => {
        var corInfo = []; 
        response.data.forEach(o => {
            if (o.computing_ID === props.compId) {
                corInfo.push(o);
            }
        })
        setStudInfo(corInfo); 
        console.log(studInfo[0]);
        });  
     }, []); 
    
    return (
        <div className="mainOuter"> 
        <div className="accountHead">
        <span><strong>Username: </strong>{props.name}</span>
        <span><strong>Computing ID:</strong> {props.compId}</span>
        <span><strong>Name: </strong>{studInfo[0].first_name} {studInfo[0].last_name}</span>
        <span><strong>Year:</strong> {studInfo[0].year}</span>
        <span><strong>Cumulative GPA:</strong> {studInfo[0].cumGPA}</span>
        </div>
        
        <div className="termClasses"></div>
        
        </div>
    )
}; 

export default MainPage; 