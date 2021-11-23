import React from "react"; 
import "../components/MainPage.css"; 

function MainPage (props) {
    return (
        <div> <span>username: {props.name}</span></div>
    )
}; 

export default MainPage; 