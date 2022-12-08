import * as React from 'react';
import styles from "../App.css"

export default function Audioplayer({sound}) {
    return (
        <audio
        // ref="audio_tag"
            autoPlay={true}
            controls={false} >
            <source type="audio/mp3" src={sound} className={styles.audioplayer}/>
        </audio>
    )
}