// npm install axios react-router-dom
// https://www.youtube.com/watch?v=_S2GKnFpdtE 
import './App.css';
import MainPage from './components/MainPage';
import { React, useEffect, useState } from "react";
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import AddCourse from './components/AddCourse';
import ChangePassword from './components/ChangePassword';
import CreateUser from './components/CreateUser';
import DeleteUser from './components/DeleteUser';


function App() {
  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("");
  const [valLogin, setvalLogin] = useState(false);
  const [logFail, setlogFail] = useState(false);
  const [compID, setcompID] = useState('');
  const [maj, setMaj] = useState([]);


  useEffect(() => {
    Axios.get('https://dry-beach-67057.herokuapp.com/api/studMajor').then(response => {
      let allMaj = []
      response.data.forEach(o => {
        if (o.computing_ID === compID) {
          allMaj.push(o.major)
        }
      })
      setMaj(allMaj);
    })
  }, [compID])

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
                <div className="form">
                  <label>Username (must be your UVA email address)</label>
                  <input type="text" name="username" onChange={changeUse}></input>
                  <label>Password</label>
                  <input type="text" name="password" onChange={changePw}></input>
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
            <div className="accInfo">
              <span><strong>Account Info</strong></span>
              <span><strong>Username: </strong>{userName}</span>
              <span><strong>Computing id: </strong>{compID}</span>
              <span><strong>Majors: </strong><ul>
                {maj.map((x) => <li>x</li>)}</ul></span>
            </div>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
