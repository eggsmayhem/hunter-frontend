import * as React from 'react';
import styles from "../App.css"

export default function Inputform(text) {
    return (
        <div>
            <textarea id="message" name="message"  ref={text} rows="4" placeholder="Your message..."></textarea>
        </div>
    )
}