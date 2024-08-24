// This file allows you to configure ESLint according to your project's needs, so that you
// can control the strictness of the linter, the plugins to use, and more.

// For more information about configuring ESLint, visit https://eslint.org/docs/user-guide/configuring/

//module.exports = [
//    {
//        rules: {}
//    }
//];

import React from 'react';
import Card from './Card';
import './GameBoard.css';

function GameBoard({ cards, onCardClick }) {
    return (
        <div className="game-board">
            {cards.map((card) => (
                <Card key={card.id} card={card} onClick={() => onCardClick(card.id)} />
            ))}
        </div>
    );
}

export default GameBoard;
