import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
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
        const initialCards = generateCardDeck();
        setCards(initialCards);
        setMoves(0);
        setTime(0);
        setIsGameActive(true);
        setFlippedCards([]);
    };

    const generateCardDeck = () => {
        const cardImages = ['images/img1.jpeg', 'images/img2.jpeg', 'images/img3.jpeg', 'images/img4.jpeg', 'images/img5.jpeg', 'images/img6.jpeg'];
        const doubledImages = [...cardImages, ...cardImages];
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
            <button onClick={initializeGame}>Restart Game</button>
        </div>
    );
}

export default App;
