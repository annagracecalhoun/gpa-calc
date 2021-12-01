import { React, useEffect, useState } from "react";
import Axios from 'axios';



function AccountInfo(props) {


    const [compID, setcompID] = useState('');
    const [userName, setuserName] = useState('');
    const [maj, setMaj] = useState([]);

    useEffect(() => {
        Axios.get('https://dry-beach-67057.herokuapp.com/api/studMajor').then(response => {
          let allMaj = []
          response.data.forEach(o => {
            if (o.computing_ID === localStorage.compID) {
              allMaj.push(o.major)
            }
          })
          console.log(allMaj);
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
    </div>
  )
}

export default AccountInfo;