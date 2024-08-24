// This file allows you to configure ESLint according to your project's needs, so that you
// can control the strictness of the linter, the plugins to use, and more.

// For more information about configuring ESLint, visit https://eslint.org/docs/user-guide/configuring/

//module.exports = [
//    {
//        rules: {}
//    }
//];

import React from 'react';
import './Card.css';

function Card({ card, onClick }) {
    return (
        <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={onClick}>
            <div className="card-front">
                <img src={card.image} alt="Card" />
            </div>
            <div className="card-back"></div>
        </div>
    );
}

export default Card;
