import * as React from 'react';
// import styles from "../App.css"

export default function Newspaper({newsArray, todaysDate}) {
    if (newsArray.length < 1) {
        return null
    }
    return (
        <div className="container">
        <div className="wrapper">
            <div className="size-in">
                <div className="newspaper">
                    <div className="title">
                        <h3>Rainy Cold</h3>  <h1>News for Humans</h1> <h3>6 A.M. Extra </h3>
                    </div>

                    <hr/>
                    <h4><span>Vol XVI</span> <span>{todaysDate}</span><span>$1.00</span></h4>
                    <hr/>
                    <h2>{newsArray[0]}</h2>
                    <p>{newsArray[1]}</p>
                </div>
            </div>
        </div>
    </div>
    )
}