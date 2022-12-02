import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "./Button"

//testing dummy button
import { getAuth } from "firebase/auth";


export default function Home() {
    let navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }

    const handleDummy = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
           console.log(user.uid)
        } else {
            console.log("No user")
    // No user is signed in.
    }

    }
    //don't delete below comment, it stops the console from sreaming
    // eslint-disable-next-line
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [useNavigate])
    return (
        <div>
            <Button handleAction={handleLogout} title="Logout"></Button>
            <Button handleAction={handleDummy} title="Dummy"></Button>
        </div>
    )
}
