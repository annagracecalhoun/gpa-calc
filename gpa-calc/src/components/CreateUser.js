import { React, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

function CreateUser() {
    const [userName, setuserName] = useState("");
    const [passWord, setpassWord] = useState("");

   
  const changeUse = (e) => {
    setuserName(e.target.value);
  }

  const changePw = (e) => {
    setpassWord(e.target.value);
  }

  const createAccount = () => {
    const valUsername = '/@virginia.edu';
    if (userName.includes('@virginia.edu')) {
        console.log("Success")
        console.log(userName);
        console.log(passWord);
        Axios.post('http://localhost:3001/api/create', { useName: userName, pw: passWord }).then(() => {
            setuserName('');
            setpassWord('');
          });
    } else {
        console.log("fail");
    }
  }

    return (
        <div>
           <span>Create an Account</span>
            <div className="form">
              <label>Username (uva email address)</label>
              <input type="text" name="username" onChange={changeUse}></input>
              <label>Password</label>
              <input type="text" name="password" onChange={changePw}></input>
              <label>First Name</label>
              <input type="text" name="firstName" onChange={changePw}></input>
              <label>Last Name</label>
              <input type="text" name="lastName" onChange={changePw}></input>
              <label>Year</label>
              <input type="text" name="year" onChange={changePw}></input>
              <label>Major</label>
              <input type="text" name="major" onChange={changePw}></input>
              <button onClick={createAccount}><Link to="/">Create</Link></button>
            </div>
        </div>
    )
};

export default CreateUser;