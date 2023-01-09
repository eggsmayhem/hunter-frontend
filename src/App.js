import { useState } from 'react';
import './App.css';
import Form from '../src/components/Form';
import Home from '../src/components/Home';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();
    //create mongo user when they create account. On mongo side verify userid doesn't already exist to be sure it's a new account
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          try {
            // test create call
            //end create call test
            const user = authentication.currentUser;
            axios.post(`https://hunterbot-api.onrender.com//users/createuser/${user.uid}`);
            navigate('/');
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
          }
          catch(err) {
            console.log(err)
            if (err.code === 'auth/email-already-in-use') {
              toast.error('Email Already in Use');
            }
          }
          
        })
    }
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          try {
            const user = authentication.currentUser
            axios.get(`https://hunterbot-api.onrender.com//users/overview/${user.uid}`);
            navigate('/')
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          }
          catch(err) {
            if(err.code === 'auth/wrong-password'){
              toast.error('Please check the Password');
            }
            if(err.code === 'auth/user-not-found'){
              toast.error('Please check the Email');
            }
            console.log(err)
          }
     
        })
    }
  }
  return (
    <div className="App">
      <>
        <Routes>
          <Route
            path='/login'
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}
              />}
          />
          <Route
            path='/register'
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)}
              />}
          />

          <Route
            path='/'
            element={
              <Home />}
          />
        </Routes>
      </>
    </div>
  );
}

export default App;