import React from "react";
const trollface = require('./images/trollimg.png');

export default function Nav() {
    return (
        <div className="nav">
            <img src={trollface} alt="Trollface" className="trollface"/>
            <h2>Meme Generator</h2>
        </div>
    );
}
