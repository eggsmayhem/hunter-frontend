import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "./Button"
import styles from "../App.css"

//testing dummy button
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function Home() {
    const [audioUrl, setAudioUrl] = useState(null);
    const [article, setArticle] = useState([]);
    let navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }

    const handleDummy = async () => {
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

                const res = await axios.post(`http://127.0.0.1:3000/exchanges/speaktohunter/${user.uid}`, {
                    data: {
                    text: "Hunter test from distributed system"
                    }
                });

                console.log(res);
                const s3_url = await res.data.s3;
             
                console.log(s3_url);
                setAudioUrl(s3_url)
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
                const s3_url = await res.data.s3;
                const newsArray = res.data.newsArray;
                const hunterText = res.data.hunterText;
                console.log(s3_url);
                setAudioUrl(s3_url)
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
            {/* newspaper */}
            <div className="container">
                <div className="wrapper">
                    <div className="size-in">
                        <div className="newspaper">
                            <div className="title">
                                <h3>Rainy Cold</h3>  <h1>The Daily DL</h1> <h3>6 A.M. Extra </h3>
                            </div>

                            <hr/>
                            <h4><span>Vol XVI</span> <span>April 1, 2017</span><span>$1.00</span></h4>
                            <hr/>
                            <h2>{article[0]}</h2>
                            <p>{article[1]}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* nespaper end */}
            <Button handleAction={handleLogout} title="Logout"></Button>
            <Button handleAction={handleDummy} title="Chat"></Button>
            <Button handleAction={handleNews} title="News"> </Button>
            {audioUrl && <audio
                            // ref="audio_tag"
                            autoPlay={true}
                            controls={false} >
                            <source type="audio/mp3" src={audioUrl} className={styles.audioplayer}/>
                        </audio>}
        </div>
    )
}
