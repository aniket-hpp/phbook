/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

//pages as components
import Home from './home';
import SignUp from './pages/signup.js';
import SignIn from './pages/signin.js';
import Reset from './pages/reset.js';
import User from './pages/user.js';
import AddNewContact from './pages/add.js';
import Profile from './pages/profile.js';

//css
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/signup/*' element={<SignUp/>}/>
            <Route exact path='/signin/*' element={<SignIn/>}/>
            <Route exact path='/reset/*' element={<Reset/>}/>
            <Route exact path='/user/*' element={<User/>}/>
            <Route exact path='/add/*' element={<AddNewContact/>}/>
            <Route exact path='/myprofile/*' element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
