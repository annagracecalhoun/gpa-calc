// npm install axios 
// https://www.youtube.com/watch?v=_S2GKnFpdtE 
import './App.css';
import {React, useEffect, useState} from "react"; 
import Axios from 'axios'; 

function App() {
  const [userName, setuserName] = useState(''); 
  const [passWord, setpassWord] = useState(''); 

  useEffect(()=> {
    Axios.get('http://localhost:3001/api/getUser').then((response) => 
    console.log(response.data)); 
  }, []); 
 
  const changeUse = (e) => {
    setuserName(e.target.value); 
  }

  const changePw = (e) => {
    setpassWord(e.target.value); 
  }

  const createAccount = () => {
    Axios.post('http://localhost:3001/api/create', {useName: userName, pw: passWord}).then(() => {
      console.log('valid login'); 
    }); 
  }

  return (
    <div className="App">
      <h1>Create an Account (adds username and pw to db)</h1>
      <div className="form">
        <label>Username</label>
      <input type="text" name="username" onChange={changeUse}></input>
      <label>Password</label>
      <input type="text" name="password" onChange={changePw}></input>
      <button onClick={createAccount}>Submit</button>
      </div>
    </div>
  );
}

export default App;
