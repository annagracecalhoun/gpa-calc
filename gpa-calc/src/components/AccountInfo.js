import { React, useEffect, useState } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";


function AccountInfo(props) {

    const [maj, setMaj] = useState([]);

    useEffect(() => {
        Axios.get('https://dry-beach-67057.herokuapp.com/api/studMajor').then(response => {
          let allMaj = []
          response.data.forEach(o => {
            if (o.computing_ID === localStorage.compID) {
              allMaj.push(o.major)
            }
          })
          setMaj(allMaj);
        })
      })

    const getUsername = () => {

        if (localStorage.username) {
            return localStorage.username;
        } else {
            return 'N/A'
        }
    }

    const getCompID = () => {
        if (localStorage.compID) {
            return localStorage.compID;
        } else {
            return 'N/A'
        }
    }

     return (
        <div className="accInfo">

                <h2 style={{marginBottom: "20px", fontWeight: "bold"}}>Account Information</h2>

                <div className="container" style={{marginBottom: "0px"}}>
                  <label className="text">Username</label>
                  <label className="text">{getUsername()}</label>
                </div>

                <div className="container">
                <label className="text">Computing ID</label>
                  <label className="text">{getCompID()}</label>
                </div>

                <div className="container">
                    <label className="text">Major(s)</label>

                    <label className="text">

                        {maj.map((major) => <h5 className="text" style={{textTransform: "capitalize" , fontWeight: "bold"}} >{major}   </h5>)}
                        
                    </label>
                </div>

                <button style={{alignSelf: "center"}}className="createButton"><Link to="/">Go Back</Link></button>
    </div>
  )
}

export default AccountInfo;