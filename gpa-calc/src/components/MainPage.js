import React from "react"; 
import "../components/MainPage.css"; 

function MainPage (props) {
    return (
        <div className="mainOuter"> 
        <span>username: {props.name}</span>
        <span>Computing ID: {props.compID}</span>
        
        <div className="termClasses"></div>
        
        </div>
    )
}; 

export default MainPage; 