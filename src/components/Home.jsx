import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "./Button"
import Newspaper from "./Newspaper"
import styles from "../App.css"
import Audioplayer from "./Audioplayer"

//testing dummy button
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function Home() {
    const [audioUrl, setAudioUrl] = useState(null);
    const [article, setArticle] = useState([]);
    const [newsDate, setNewsDate] = useState("");
    const [message, setMessage] = useState('');
    const speechText = useRef();

  
    const handleMessageChange = event => {
        // 👇️ access textarea value
        setMessage(event.target.value);
        console.log(event.target.value);
      };
   
    let navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }

    const handleDummy = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            const userInput = speechText.current.value;

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
                    text: userInput
                    }
                });

                console.log(res);
                const s3_url = await res.data.s3;
             
                console.log(s3_url);
                setMessage('');
                setAudioUrl(s3_url);
             
        //    let audio = new Audio(s3_url);
        //    audio.play();
        //    const verification = res.data.body.message; 
        //    const hunterResponse = res.data.body.data.text
        //    console.log(verification)
        //    console.log(hunterResponse)
            }else {
            console.log("No user")
    // No user is signed in.
            }
        }
        catch(err) {
            console.log(err);
        }
        

    }

    const handleNews = async () => {
        try {
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

                const res = await axios.post(`http://127.0.0.1:3000/exchanges/getthenews/${user.uid}`, {
                    data: {
                    text: "Hunter test from distributed system"
                    }
                });

                console.log(res);
                const s3_url = res.data.s3;
                const newsArray = res.data.newsArray;
                const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              
                const date = new Date();
                const month = date.getMonth();
                setNewsDate(`${Months[month]} ${date.getDate()}, ${date.getUTCFullYear()}`)
                // const hunterText = res.data.hunterText;
                console.log(s3_url);
                setAudioUrl(s3_url);
                setArticle(newsArray);
            }else {
            console.log("No user")
            }
        }
        catch(err) {
            console.log(err);
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
        <div className="black">
             <div>
                {/* <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Click Send to send a message, or News to get GPT-Hunter's opinion on a random news story</label> */}
                <textarea id="message" name="message"  ref={speechText} rows="4" placeholder="Your message..."></textarea>
            </div>
            {/* newspaper */}
            <Newspaper key={article[0]} newsArray={article} todaysDate={newsDate}/>
            {/* nespaper end */}
            <Button handleAction={handleLogout} title="Logout"></Button>
            <Button handleAction={handleDummy} title="Chat"></Button>
            <Button handleAction={handleNews} title="News"> </Button>
            {audioUrl && <Audioplayer key={audioUrl} sound={audioUrl}/>}
            
        </div>
    )
}
