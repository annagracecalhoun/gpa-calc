import { React, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

function ChangePassword() {
    const [newPassword, setNewPassword] = useState();
    const [currentPassCheck, setCurrentPassCheck] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [changeFail, setChangeFail] = useState(false);


    const checkCurrentPass = (e) => {
        Axios.get('https://dry-beach-67057.herokuapp.com/api/getUser').then((response) => {
            const isValid = response.data.find((o) => o.username === localStorage.username && o.password === e.target.value);

            if (isValid) { // match found in database => valid current password provided
                setCurrentPassCheck(true);
            }
            else {
                setCurrentPassCheck(false);
            }
        });
    }

    const getNewPass = (e) => {
        setNewPassword(e.target.value);
    }

    const changePassword = () => {
        if (currentPassCheck === true && newPassword) {
            Axios.post('https://dry-beach-67057.herokuapp.com/api/passUpdate', { useName: localStorage.username, pw: newPassword }).then(() => {
                localStorage.setItem('password', newPassword);
            });
            setPasswordChanged(true);
        } else {
            setChangeFail(true);
        }
    }

    return (
        <div>
            {passwordChanged ?
                <div>
                    <h1 style={{color: "green"}}>Success!</h1>
                    <h5>Your password has been successfully updated.</h5>
                    <button className="createButton" style={{ marginTop: "10px" }}><Link to="/">Login</Link></button>
                </div>
                : null}

            {!passwordChanged ?
                <div>

                    <h2 style={{marginBottom: "20px", fontWeight: "bold"}}>Change Password</h2>

                    <span>Type your current password and the new password</span>



                    <div className="form" style={{marginTop: "20px"}}>


                    <div className="container" style={{margin: "0px"}}>
                        <label className="text">Current Password</label>
                        <input className="input" type="text" name="Subject" placeholder="" onChange={checkCurrentPass}></input>
                    </div>

                    <div className="container" style={{margin: "0px"}}>
                        <label className="text">New Password</label>
                        <input className="input" type="text" name="Number"  placeholder="" onChange={getNewPass}></input>
                    </div>
                
                    </div>

                    <button className="createButton" style={{ marginTop: "5px" }}><Link to="/">Cancel</Link></button>
                    <button className="createButton" onClick={changePassword}>Update password</button>


                    {changeFail ? 
                    <div>

                    <h3 style={{marginTop: "15px", color: "red"}}>Error!</h3> 
                    <h5 style={{marginTop: "15px", color: "red"}}>Please provide correct information</h5> 

                    </div>
                    
                    : null}
                </div>
                : null}
        </div>
    )
};

export default ChangePassword;