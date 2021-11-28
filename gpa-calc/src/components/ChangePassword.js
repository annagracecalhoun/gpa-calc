import { React, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

function ChangePassword() {
    const [newPassword, setNewPassword] = useState();
    const [currentPassCheck, setCurrentPassCheck] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [changeFail, setChangeFail] = useState(false);


    const checkCurrentPass = (e) => {
        Axios.get('http://localhost:3001/api/getUser').then((response) => {
            const isValid = response.data.find((o) => o.username === localStorage.username && o.password === e.target.value);

            //  console.log("Checking user: ", localStorage.username, " with password: ", e.target.value);

            if (isValid) { // match found in database => valid current password provided
                console.log("success");
                setCurrentPassCheck(true);
            }
            else {
                console.log("fail");
                setCurrentPassCheck(false);
            }
        });
    }

    const getNewPass = (e) => {
        setNewPassword(e.target.value);
    }

    const changePassword = () => {
        if (currentPassCheck === true && newPassword) {
            console.log(newPassword)
            Axios.post('http://localhost:3001/api/passUpdate', { useName: localStorage.username, pw: newPassword }).then(() => {
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
                    <h1>Success!</h1>
                    <h5>Your password has been successfully updated.</h5>
                    <button style={{ marginTop: "10px" }}><Link to="/">Login</Link></button>
                </div>
                : null}

            {!passwordChanged ?
                <div>
                    <span>Type current password and new password</span>

                    <div className="form">
                        <label>Current Password</label>
                        <input type="text" name="currentPass" onChange={checkCurrentPass}></input>
                        <label>New Password</label>
                        <input type="text" name="newPassword" onChange={getNewPass}></input>
                        <button onClick={changePassword}>Update password</button>
                        {changeFail ? <span>Error.</span> : null}
                    </div>

                    <button style={{ marginTop: "10px" }}><Link to="/">Cancel</Link></button>
                </div>
                : null}
        </div>
    )
};

export default ChangePassword;