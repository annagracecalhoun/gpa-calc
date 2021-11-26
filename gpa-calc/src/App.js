// npm install axios react-router-dom
// https://www.youtube.com/watch?v=_S2GKnFpdtE 
import './App.css';
import MainPage from './components/MainPage';
import {React, useEffect, useState} from "react"; 
import Axios from 'axios'; 
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"; 
import AddCourse from './components/AddCourse';


function App() {
  const [userName, setuserName] = useState(''); 
  const [passWord, setpassWord] = useState(''); 
  const [valLogin, setvalLogin] = useState(false); 
  const [logFail, setlogFail] = useState(false); 
  const [compID, setcompID] = useState(''); 

 
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
            {valLogin? <div>
              <MainPage name={userName} compId={compID}></MainPage>


            </div> : null}
          </Route>: 
          
          <Route exact path="/createNew">
      <span>Create an Account (adds username and pw to db)</span>
      <div className="form">
        <label>Username</label>
      <input type="text" name="username" onChange={changeUse}></input>
      <label>Password</label>
      <input type="text" name="password" onChange={changePw}></input>
      <button onClick={createAccount}><Link to="/">Submit</Link></button>
      </div>
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
