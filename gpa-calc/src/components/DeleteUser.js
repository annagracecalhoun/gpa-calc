import { React, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

function DeleteUser() {
    const [userName, setuserName] = useState("");
    const [passWord, setpassWord] = useState("");
    const [confirm, setConfirm] = useState("");

   
  const changeUse = (e) => {
    setuserName(e.target.value);
  }

  const changePw = (e) => {
    setpassWord(e.target.value);
  }

  const deleteAccount = () => {
    Axios.post('https://dry-beach-67057.herokuapp.com/api/delete', { useName: userName, pw: passWord }).then(() => {
      setuserName('');
      setpassWord('');
    });
  }


    return (
        <div>
           <p style={{marginTop: "20px"}}>Type in your username and password to delete account</p>
            <div className="form" style={{}}>
              <label>Username (uva email address)</label>
              <input type="text" name="username" onChange={changeUse}></input>
              <label>Password</label>
              <input type="text" name="password" onChange={changePw}></input>

            
              <label>Are you sure you want to delete your account?</label>
              <p>This action CANNOT be undone</p>

              <button style={{marginTop: "10px"}} onClick={deleteAccount}><Link to="/">Delete</Link></
              button>

              <button style={{marginTop: "20px"}}><Link to="/">Cancel</Link></
              button>
            </div>
        </div>
    )
};

export default DeleteUser;