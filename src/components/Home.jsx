import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "./Button"

//testing dummy button
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function Home() {
    let navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }

    const handleDummy = async (req, res) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
        //    console.log(user.uid)
        //    const data = {
        //        uid: "K3zo9YSEejSyTXLeD3PZflw96xD2"
        //    }
        //    console.log(data);

           const res = await axios.post(`http://127.0.0.1:3000/exchanges/speaktohunter/${user.uid}`, {
               data: {
                text: "Hunter test from distributed system"
               }
           });
           console.log(res)
           const s3_url = res.data.s3;
           console.log(s3_url)
        //    const verification = res.data.body.message; 
        //    const hunterResponse = res.data.body.data.text
        //    console.log(verification)
        //    console.log(hunterResponse)
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
