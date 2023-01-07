import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "./Button"
import Newspaper from "./Newspaper"
import Inputform from "./Inputform"
import Audioplayer from "./Audioplayer"
import styles from "../App.css"
import hunterImg from "../assets/hunterbotdallenobg2.png"

//testing dummy button
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function Home() {
    const [audioUrl, setAudioUrl] = useState(null);
    const [article, setArticle] = useState([]);
    const [newsDate, setNewsDate] = useState("");
    const [message, setMessage] = useState('');
    // const [user, setUser] = useState({});
    const speechText = useRef();

  
    const handleMessageChange = event => {
        // 👇️ access textarea value
        setMessage(event.target.value);
        console.log(event.target.value);
      };
   
    
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    let navigate = useNavigate();
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
    }, [])

    // useEffect(() => {
    //     const auth = getAuth();
    //     setUser(auth.currentUser);
    //     console.log(user);
    // })

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

            }else {
            console.log("No user")
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
            if (user) console.log(user.uid)

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
   
    return (
        <div className="black">
            <div className="topContainer">
                <div>I'm <i>not</i> Hunter S Thompson, and I <i>don't</i> approve this message</div>
                <a href="#">Read more about this project</a>
                <img src={hunterImg} className="authorArt"/>
                <div>Send a message with Chat, or press News to get Hunterbot's take on a random news article</div>
            </div>
           
            <Inputform ref={speechText} changeHandler={handleMessageChange} messageValue={message}/>
            <div className="buttons">
                <Button handleAction={handleDummy} title="Chat"></Button>
                <Button handleAction={handleNews} title="News"> </Button>
            </div>
            {audioUrl && <Audioplayer key={audioUrl} sound={audioUrl}/>}
             {/* newspaper */}
             <div className="newspaperSlot">
                <Newspaper key={article[0]} newsArray={article} todaysDate={newsDate}/>
            </div>
            {/* nespaper end */}
            <Button handleAction={handleLogout} title="Logout"></Button>
            
        </div>
    )
}
