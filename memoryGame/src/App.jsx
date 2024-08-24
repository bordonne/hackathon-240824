import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard.jsx';
import ScoreBoard from '../components/ScoreBoard.jsx';
//import './App.css';

function App() {
    const [cards, setCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [isGameActive, setIsGameActive] = useState(false);
    const [flippedCards, setFlippedCards] = useState([]);

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        let timer;
        if (isGameActive) {
            timer = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
        } else if (!isGameActive && time !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isGameActive, time]);

    const initializeGame = () => {
        alert("sssss")
        const initialCards = generateCardDeck();
        console.log('1')
        setCards(initialCards);
        setMoves(0);
        setTime(0);
        setIsGameActive(true);
        setFlippedCards([]);
    };

    const generateCardDeck = () => {
        const cardImages = ["../public/images/1.jpeg", "../public/images/2.jpeg", "../public/images/3.jpeg", "../public/images/4.jpeg", "../public/images/5.jpeg", "../public/images/6.jpeg"];
        const doubledImages = [...cardImages, ...cardImages];
        console.log('sdgfdgg')
        return doubledImages.sort(() => Math.random() - 0.5).map((image, index) => ({
            id: index,
            image,
            isFlipped: false,
            isMatched: false
        }));
    };

    const handleCardClick = (id) => {
        if (flippedCards.length === 2 || cards.find(card => card.id === id).isFlipped) return;

        const updatedCards = cards.map(card => {
            if (card.id === id) card.isFlipped = true;
            return card;
        });
        
        setCards(updatedCards);
        setFlippedCards([...flippedCards, id]);

        if (flippedCards.length === 1) {
            setMoves(prevMoves => prevMoves + 1);
            const firstCard = cards.find(card => card.id === flippedCards[0]);
            const secondCard = cards.find(card => card.id === id);

            if (firstCard.image === secondCard.image) {
                const newCards = cards.map(card => {
                    if (card.id === firstCard.id || card.id === secondCard.id) card.isMatched = true;
                    return card;
                });
                setCards(newCards);
                setFlippedCards([]);
                if (newCards.every(card => card.isMatched)) setIsGameActive(false);
            } else {
                setTimeout(() => {
                    const resetCards = cards.map(card => {
                        if (card.id === firstCard.id || card.id === secondCard.id) card.isFlipped = false;
                        return card;
                    });
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="App">
            <ScoreBoard moves={moves} time={time} />
            <GameBoard cards={cards} onCardClick={handleCardClick} />
            <button onClick={initializeGame}>Restart Game11</button>
        </div>
    );
}

export default App;
