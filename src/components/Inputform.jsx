import * as React from 'react';
// import styles from "../App.css"

function Inputform({changeHandler, messageValue}, ref) {
    return (
        <div>
            <textarea id="message" name="message"  onChange={changeHandler} value={messageValue} ref={ref} rows="6" placeholder="Your message..." className="textHolder"></textarea>
        </div>
    )
}

export default React.forwardRef(Inputform);