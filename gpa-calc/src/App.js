// npm install axios react-router-dom
// https://www.youtube.com/watch?v=_S2GKnFpdtE 
import './App.css';
import {React, useEffect, useState} from "react"; 
import Axios from 'axios'; 
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"; 


function App() {
  const [userName, setuserName] = useState(''); 
  const [passWord, setpassWord] = useState(''); 

  useEffect(()=> {
    Axios.get('http://localhost:3001/api/getUser').then((response) => 
    console.log(response.data));   // look in console to 
  }, []); 
 
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
    console.log(userName); 
    console.log(passWord);
    Axios.get('http://localhost:3001/api/getUser').then((response) => {
    const isValid = response.data.find((o) => o.username === userName && o.password === passWord); 
    if (isValid) {
      console.log("valid login"); 
    }
    else {
      console.log("invalid login")
    }
  }); 
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"> 
          <div className="logScreen">
            <span>Login to your account</span>
            <div className="form">
            <label>Username</label>
            <input type="text" name="username" onChange={changeUse}></input>
            <label>Password</label>
            <input type="text" name="password" onChange={changePw}></input>
            <button onClick={tryLogin}>Login</button>
            </div>
            <span>Don't have an account?</span>
            <button><Link to="/createNew">Create New Account</Link></button>
            </div>
          </Route>
          <Route exact path="/createNew">
      <span>Create an Account (adds username and pw to db)</span>
      <div className="form">
        <label>Username</label>
      <input type="text" name="username" onChange={changeUse}></input>
      <label>Password</label>
      <input type="text" name="password" onChange={changePw}></input>
      <button onClick={createAccount}>Submit</button>
      </div>
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;

