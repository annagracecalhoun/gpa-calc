import { React, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

function CreateUser() {
    const [userName, setuserName] = useState("");
    const [passWord, setpassWord] = useState("");


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [year, setYear] = useState("1st");
    const [major, setMajor] = useState("");

    let yearList = ['1st', '2nd', '3rd', '4th']
    
    const changeUsername = (e) => {
      setuserName(e.target.value);
    }

    const changePassword = (e) => {
      setpassWord(e.target.value);
    }

    const changeFirstName = (e) => {
      setFirstName(e.target.value);
    }

    const changeLastName = (e) => {
      setLastName(e.target.value);
    }

    const changeYear = (e) => {
      setYear(e.target.value);
    }

    const changeMajor = (e) => {
      setMajor(e.target.value);
    }


    const createAccount = () => {
      if (userName.includes('@virginia.edu')) {
          console.log("Success")
          console.log(userName);
          console.log(passWord);
          Axios.post('https://dry-beach-67057.herokuapp.com/api/create', { useName: userName, pw: passWord }).then(() => {
              setuserName('');
              setpassWord('');
            });
      } else {
          console.log("fail");
      }
    }

    return (
        <div>
          
           <h2 style={{marginBottom: "20px", fontWeight: "bold"}}>Create an Account</h2>


            <div className="form">

              {/* Username */}
               <div className="container" style={{margin: "0px"}}>
                  <label className="text">Username (Your UVA email)</label>
                  <input className="input" type="text" name="Subject" placeholder="" onChange={changeUsername}></input>
                </div>

              {/* Password */}
                <div className="container" style={{margin: "0px"}}>
                  <label className="text">Password</label>
                  <input className="input" type="password" name="Number"  placeholder="" onChange={changePassword}></input>
                </div>


              {/* First Name */}
                <div className="container" style={{margin: "0px"}}>
                  <label className="text">First Name</label>
                  <input className="input" type="password" name="Number"  placeholder="John" onChange={changeFirstName}></input>
                </div>

              {/* Last Name */}
                <div className="container" style={{margin: "0px"}}>
                  <label className="text">Last Name</label>
                  <input className="input" type="password" name="Number"  placeholder="Doe" onChange={changeLastName}></input>
                </div>

              {/* Year Name */}         
                <div className="container" style={{margin: "0px"}}> 
                  <label className="text">Year</label>
                  <select className="input" onChange={changeYear}>
                    {yearList.map((grade) =>
                      <option key={grade}>{grade}</option>)}
                  </select>
                </div>

              {/* Major Name */}
                <div className="container" style={{margin: "0px"}}>
                  <label className="text">Major</label>
                  <input className="input" type="password" name="Number"  placeholder="Commerce" onChange={changeMajor}></input>
                </div>
            </div>

            <button className="createButton"><Link to="/">Go back</Link></button>
          <button className="createButton" onClick={createAccount}><Link to="/">Create Account</Link></button>

        </div>
    )
};

export default CreateUser;