import {React, useEffect, useState} from "react"; 
import "../styles/MainPage.css"; 
import Axios from 'axios'; 

function MainPage (props) {
const [studInfo, setStudInfo] = useState([]); 

    useEffect(()=> {
        // {params: {compID: props.compID}} 
        const corInfo = []
        Axios.get('http://localhost:3001/api/getStudent').then((response) => {
        corInfo.push(response.data.find(x => x.computing_ID === props.compId)); 
        });  
    setStudInfo(corInfo); 
     }, []); 
     
    return (
        <div className="mainOuter"> 
        <div className="accountHead">
        <span><strong>Username: </strong>{props.name}</span>
        <span><strong>Computing ID:</strong> {props.compId}</span>
        </div>
        
        <div className="termClasses"></div>
        
        </div>
    )
}; 

export default MainPage; 