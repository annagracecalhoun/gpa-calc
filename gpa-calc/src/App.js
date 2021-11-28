// npm install axios react-router-dom
// https://www.youtube.com/watch?v=_S2GKnFpdtE 
import './App.css';
import MainPage from './components/MainPage';
import {React, useEffect, useState} from "react"; 
import Axios from 'axios'; 
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom"; 
import AddCourse from './components/AddCourse';


function App() {
  const [userName, setuserName] = useState(''); 
  const [passWord, setpassWord] = useState(''); 
  const [valLogin, setvalLogin] = useState(false); 
  const [logFail, setlogFail] = useState(false); 
  const [compID, setcompID] = useState(''); 
  const [maj, setMaj] = useState([]); 

 
  useEffect(() => {
    Axios.get('http://localhost:3001/api/studMajor').then(response => {
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

  const createAccount = () => {
    Axios.post('http://localhost:3001/api/create', {useName: userName, pw: passWord}).then(() => {
      setuserName(''); 
      setpassWord(''); 
    }); 
  }

  const deleteAccount = () => {
    Axios.post('http://localhost:3001/api/delete', {useName: userName, pw: passWord}).then(() => {
      setuserName(''); 
      setpassWord(''); 
    }); 
  }

  const changePassword = () => {
    Axios.post('http://localhost:3001/api/passUpdate', {useName: userName, pw: passWord}).then(() => {
      setuserName(''); 
      setpassWord(''); 
      setvalLogin(true); 
    }); 
  }

  const tryLogin = () => {
    Axios.get('http://localhost:3001/api/getUser').then((response) => {
    const isValid = response.data.find((o) => o.username === userName && o.password === passWord); 
    if (isValid) {
      const compID2 = userName.split('@')[0];      // get comp id from email
      setcompID(compID2); 
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
          <Route exact path="/addCourse">
              <AddCourse name={userName} compId={compID}></AddCourse>
            </Route>
            <Route exact path ="/delete">
            <span>Confirm username and password to delete account</span>
      <div className="form">
        <label>Username (uva email address)</label>
      <input type="text" name="username" onChange={changeUse}></input>
      <label>Password</label>
      <input type="text" name="password" onChange={changePw}></input>
      <button onClick={deleteAccount}><Link to="/">Delete</Link></button>
      </div>
            </Route>
            <Route exact path="/change-password">
            <span>Type username and new password</span>
      <div className="form">
        <label>Username (uva email address)</label>
      <input type="text" name="username" onChange={changeUse}></input>
      <label>New Password</label>
      <input type="text" name="password" onChange={changePw}></input>
      <button onClick={changePassword}><Link to="/">Update password</Link></button>
</div>
            </Route>
          <Route exact path="/"> 
          {!valLogin? 
          <div className="logScreen">
            <div className="mainHead">
            <span>Log in to your UVA GPA Calculator account</span>
            </div>
            <div className="form">
            <label>Username (must be your UVA email address)</label>
            <input type="text" name="username" onChange={changeUse}></input>
            <label>Password</label>
            <input type="text" name="password" onChange={changePw}></input>
            <button  className="logButton" onClick={tryLogin}>Login</button>
            {logFail? <span>Login Failed</span>: null}
            </div>
            <div className="newAcc">
            <span className="noAcc">Don't have an account?</span>
            <button className="logButton"><Link to="/createNew">Create New Account</Link></button>
            </div>
            </div> :null}
            {valLogin? 
             <div>
              <MainPage name={userName} compId={compID}></MainPage>
            </div> : null}
          </Route>: 
          <Route exact path="/createNew">
      <span>Create an Account</span>
      <div className="form">
        <label>Username (uva email address)</label>
      <input type="text" name="username" onChange={changeUse}></input>
      <label>Password</label>
      <input type="text" name="password" onChange={changePw}></input>
      <button onClick={createAccount}><Link to="/">Create</Link></button>
      </div>
      </Route>
      <Route exact path="/details">
        {testFunc}
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
