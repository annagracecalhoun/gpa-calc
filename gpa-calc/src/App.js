// npm install axios react-router-dom
// https://www.youtube.com/watch?v=_S2GKnFpdtE 
import './App.css';
import MainPage from './components/MainPage';
import { React, useState } from "react";
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddCourse from './components/AddCourse';
import ChangePassword from './components/ChangePassword';
import CreateUser from './components/CreateUser';
import DeleteUser from './components/DeleteUser';
import AccountInfo from './components/AccountInfo';


function App() {
  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("");
  const [valLogin, setvalLogin] = useState(false);
  const [logFail, setlogFail] = useState(false);
  const [compID, setcompID] = useState('');


  const changeUse = (e) => {
    setuserName(e.target.value);
  }

  const changePw = (e) => {
    setpassWord(e.target.value);
  }

  const tryLogin = async () => {
    Axios.get('https://dry-beach-67057.herokuapp.com/api/getUser').then((response) => {
      const isValid = response.data.find((o) => o.username === userName && o.password === passWord);
      if (isValid) {
        const compID2 = userName.split('@')[0];      // get comp id from email
        setcompID(compID2);

        localStorage.setItem('username', userName)
        localStorage.setItem('password', passWord)
        localStorage.setItem('compID', compID2)

        setvalLogin(true);
      }
      else {
        setvalLogin(false);
        setlogFail(true);
      }
    });
  }


  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Add Course Page */}
          <Route exact path="/addCourse">
            <AddCourse name={userName} compId={compID}></AddCourse>
          </Route>

          {/* Delete User Page */}
          <Route exact path="/delete">
            <DeleteUser></DeleteUser>
          </Route>

          {/* Change Password Page */}
          <Route exact path="/change-password">
            <ChangePassword></ChangePassword>
          </Route>


          {/* Home Page */}
          <Route exact path="/">
            {!valLogin ?
              <div className="logScreen">

                <div className="mainHead">
                  <span>Log in to your UVA GPA Calculator account</span>   
                </div>
                <div className="line"> </div>


                <div className="form">

                <div className="container" style={{marginBottom: "0px"}}>
                  <label className="text">Username (Your UVA email)</label>
                  <input className="input" type="text" name="Subject" placeholder="demo@virginia.edu" onChange={changeUse}></input>
                </div>

                <div className="container" style={{marginTop: "0px"}}>
                  <label className="text">Password</label>
                  <input className="input" type="password" name="Number"  placeholder="" onChange={changePw}></input>
                </div>
    
                  <button className="logButton" onClick={tryLogin}>Login</button>
                  {logFail ? <span>Login Failed</span> : null}
                </div>


                <div className="newAcc">
                  <span className="noAcc">Don't have an account?</span>
                  <button className="logButton"><Link to="/createNew">Create New Account</Link></button>
                </div>

                {/* Demo User Info */}
                <div style={{alignSelf: "center", marginTop: "25px", borderRadius: "15px", border: "2px solid #120348", backgroundColor: "#e7e4f9", width: "400px", display: "flex", flexDirection: "column", padding: "10px"}}>
                    <h4 style={{textAlign:"left", marginLeft: "35px", lineHeight: "1.5"}}>For demo purposes, you may use the following demo user login credentials:</h4>
                    <h4 style={{textAlign:"left", marginLeft: "35px"}}><strong>Username</strong>: demo@virginia.edu</h4>
                    <h4 style={{textAlign:"left", marginLeft: "35px"}}><strong>Password</strong>: demo</h4>  
                   
                </div>
                
              </div> : null}

            {valLogin ?
              <div>
                <MainPage name={userName} compId={compID}></MainPage>
              </div> : null}
          </Route>


          {/* Create New Account Page */}
          <Route exact path="/createNew">
            <CreateUser></CreateUser>
          </Route>

          <Route exact path="/details">
            <AccountInfo></AccountInfo>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
