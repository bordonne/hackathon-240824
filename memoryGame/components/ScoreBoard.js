// This file allows you to configure ESLint according to your project's needs, so that you
// can control the strictness of the linter, the plugins to use, and more.

// For more information about configuring ESLint, visit https://eslint.org/docs/user-guide/configuring/

//module.exports = [
//    {
//        rules: {}
//    }
//];

import React from 'react';
import './ScoreBoard.css';

function ScoreBoard({ moves, time }) {
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="score-board">
            <span>Moves: {moves}</span>
            <span>Time: {formatTime(time)}</span>
        </div>
    );
}

export default ScoreBoard;
