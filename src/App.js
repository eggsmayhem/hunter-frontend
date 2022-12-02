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
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          try {
            navigate('/home')
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
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
            navigate('/home')
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
            path='/home'
            element={
              <Home />}
          />
        </Routes>
      </>
    </div>
  );
}

export default App;